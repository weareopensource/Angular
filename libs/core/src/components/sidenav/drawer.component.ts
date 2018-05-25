import { DOCUMENT } from '@angular/common';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/** Throws an exception when two CoreDrawer are matching the same position. */
export function throwCoreDuplicatedDrawerError(position: string): void {
  throw Error(`A drawer was already declared for 'position="${position}"'`);
}

/**
 * Drawer toggle promise result.
 * @deprecated
 */
export class CoreDrawerToggleResult {
  constructor(public type: 'open' | 'close', public animationFinished: boolean) {}
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'core-drawer-content',
  template: '<ng-content></ng-content>',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'core-drawer-content',
    '[style.margin-left.px]': '_margin'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
// tslint:disable-next-line:component-class-suffix
export class CoreDrawerContent implements AfterContentInit {
  _margin: number;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    // tslint:disable-next-line:no-forward-ref
    @Inject(forwardRef(() => CoreDrawerContainer))
    private _container: CoreDrawerContainer
  ) {}

  ngAfterContentInit(): void {
    this._container._contentMargin.subscribe(margin => {
      this._margin = margin;
      this._changeDetectorRef.markForCheck();
    });
  }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'core-drawer',
  exportAs: 'CoreDrawer',
  template: '<ng-content></ng-content>',
  animations: [
    trigger('transform', [
      state(
        'open, open-instant',
        style({
          width: '300px'
        })
      ),
      state(
        'close',
        style({
          width: 0
        })
      ),
      transition('close => open-instant', animate('0ms')),
      transition('close <=> open, open-instant => close', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'core-drawer',
    '@transform': '_animationState',
    '(@transform.start)': '_onAnimationStart($event)',
    '(@transform.done)': '_onAnimationEnd($event)',
    '(keydown)': 'handleKeydown($event)',
    // must prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[class.core-drawer-end]': 'false',
    '[class.core-drawer-start]': 'true',
    '[class.core-drawer-side]': 'true',
    tabIndex: '-1'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
// tslint:disable-next-line:component-class-suffix
export class CoreDrawer implements AfterContentInit {
  private _elementFocusedBeforeDrawerWasOpened: HTMLElement | null = undefined;

  /** Whether the drawer is initialized. Used for disabling the initial animation. */
  private _enableAnimations = false;

  /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
  @Input()
  get disableClose(): boolean {
    return this._disableClose;
  }
  set disableClose(value: boolean) {
    this._disableClose = coerceBooleanProperty(value);
  }
  private _disableClose = false;

  /**
   * Whether the drawer is opened. We overload this because we trigger an event when it
   * starts or end.
   */
  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(v: boolean) {
    this.toggle(coerceBooleanProperty(v));
  }
  private _opened = false;

  @Input()
  get show(): boolean {
    return this._show;
  }
  set show(value) {
    this._show = value;
  }
  private _show = true;

  private _expandedWidth = 300;

  /** How the sidenav was opened (keypress, mouse click etc.) */
  private _openedVia: FocusOrigin | null;

  /** Emits whenever the drawer has started animating. */
  public _animationStarted = new EventEmitter<AnimationEvent>();

  /** Current state of the sidenav animation. */
  public _animationState: 'open-instant' | 'open' | 'close' = 'close';

  public _collapsedWidth = 0;

  /** Event emitted when the drawer open state is changed. */
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Event emitted when the drawer width changed. */
  @Output()
  collapsedWidthChange: EventEmitter<number> = new EventEmitter<number>();

  /** Event emitted when the drawer has been opened. */
  @Output('opened')
  get _openedStream(): Observable<void> {
    return this.openedChange.pipe(filter(o => !!o), map(() => {}));
  }

  /** Event emitted when the drawer has started opening. */
  @Output()
  get openedStart(): Observable<void> {
    return this._animationStarted.pipe(
      filter(e => e.fromState !== e.toState && e.toState.indexOf('open') === 0),
      map(() => {})
    );
  }

  /** Event emitted when the drawer has been closed. */
  @Output('closed')
  get _closedStream(): Observable<void> {
    return this.openedChange.pipe(filter(o => !o), map(() => {}));
  }

  /** Event emitted when the drawer has started closing. */
  @Output()
  get closedStart(): Observable<void> {
    return this._animationStarted.pipe(filter(e => e.fromState !== e.toState && e.toState === 'close'), map(() => {}));
  }

  constructor(
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor,
    @Optional()
    @Inject(DOCUMENT)
    private _doc: any
  ) {
    this.openedChange.subscribe((opened: boolean) => {
      if (opened) {
        if (this._doc) {
          this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement as HTMLElement;
        }
      } else {
        this._restoreFocus();
      }
    });
  }

  /**
   * If focus is currently inside the drawer, restores it to where it was before the drawer
   * opened.
   */
  private _restoreFocus(): void {
    const activeEl = this._doc && this._doc.activeElement;

    if (activeEl && this._elementRef.nativeElement.contains(activeEl)) {
      if (this._elementFocusedBeforeDrawerWasOpened instanceof HTMLElement) {
        this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
      } else {
        this._elementRef.nativeElement.blur();
      }
    }

    this._elementFocusedBeforeDrawerWasOpened = undefined;
    this._openedVia = undefined;
  }

  ngAfterContentInit(): void {
    this._enableAnimations = true;
  }

  /**
   * Open the drawer.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  open(openedVia?: FocusOrigin): Promise<void> {
    return this.toggle(true, openedVia);
  }

  /** Close the drawer. */
  close(): Promise<void> {
    return this.toggle(false);
  }

  /**
   * Toggle this drawer.
   * @param isOpen Whether the drawer should be open.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  toggle(isOpen: boolean = !this.opened, openedVia: FocusOrigin = 'program'): Promise<void> {
    this._opened = isOpen;

    if (isOpen) {
      this._animationState = this._enableAnimations ? 'open' : 'open-instant';
      this._openedVia = openedVia;
    } else {
      this._animationState = 'close';
      this._restoreFocus();
    }

    // TODO(crisbeto): This promise is here for backwards-compatibility.
    // It should be removed next time we do breaking changes in the drawer.
    return new Promise<any>(resolve => {
      this.openedChange
      .pipe(take(1))
      .subscribe(open => {
        resolve(new CoreDrawerToggleResult(open ? 'open' : 'close', true));
      });
    });
  }

  /**
   * Handles the keyboard events.
   * @docs-private
   */
  handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ESCAPE && !this.disableClose) {
      this.close();
      event.stopPropagation();
    }
  }

  _onAnimationStart(event: AnimationEvent): void {
    this._animationStarted.emit(event);
  }

  _onAnimationEnd(event: AnimationEvent): void {
    const { fromState, toState } = event;

    if (toState.indexOf('open') === 0 && fromState === 'close') {
      this.openedChange.emit(true);
    } else if (toState === 'close' && fromState.indexOf('open') === 0) {
      this.openedChange.emit(false);
    }
  }

  @Input()
  get expandedWidth(): number {
    return this._expandedWidth;
  }
  set expandedWidth(width) {
    this._expandedWidth = width;
  }

  @Input()
  get collapsedWidth(): number {
    return this._collapsedWidth;
  }

  set collapsedWidth(width) {
    this._collapsedWidth = width;
  }
}

/**
 * <core-drawer-container> component.
 *
 * This is the parent component to one or two <core-drawer>s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
// tslint:disable-next-line:max-classes-per-file
@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'core-drawer-container',
  exportAs: 'CoreDrawerContainer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'core-drawer-container'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
// tslint:disable-next-line:component-class-suffix
export class CoreDrawerContainer implements AfterContentInit, OnDestroy {
  @ContentChild(CoreDrawer) _drawer: CoreDrawer;

  @ContentChild(CoreDrawerContent) _content: CoreDrawerContent;

  /** Emits when the component is destroyed. */
  private _destroyed = new Subject<void>();

  _contentMargin = new Subject<number>();

  constructor(private _element: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this._watchDrawerCollapsedWidth();
    this._watchDrawerToggle();
    if (this._drawer.open) {
      this._updateContentMargins();
    }
    this._changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Calls `open` of both start and end drawers */
  open(): void {
    this._drawer.open();
  }

  /** Calls `close` of both start and end drawers */
  close(): void {
    this._drawer.close();
  }

  /**
   * Subscribes to drawer events in order to set a class on the main container element when the
   * drawer is open and the backdrop is visible. This ensures any overflow on the container element
   * is properly hidden.
   */
  private _watchDrawerToggle(): void {
    this._drawer._animationStarted
      .pipe(
        //      takeUntil(this._drawers.changes),
        filter((event: AnimationEvent) => event.fromState !== event.toState)
      )
      .subscribe((event: AnimationEvent) => {
        // Set the transition class on the container so that the animations occur. This should not
        // be set initially because animations should only be triggered via a change in state.
        if (event.toState !== 'open-instant') {
          this._element.nativeElement.classList.add('core-drawer-transition');
        }

        this._updateContentMargins();
        this._changeDetectorRef.markForCheck();
      });

    this._drawer.openedChange
      .pipe(/*takeUntil(this._drawers.changes)*/)
      .subscribe(() => this._setContainerClass(this._drawer.opened));
  }

  private _watchDrawerCollapsedWidth(): void {
    this._drawer.collapsedWidthChange
      .subscribe(() => this._updateContentMargins());
  }

  /** Toggles the 'core-drawer-opened' class on the main 'core-drawer-container' element. */
  private _setContainerClass(isAdd: boolean): void {
    if (isAdd) {
      this._element.nativeElement.classList.add('core-drawer-opened');
    } else {
      this._element.nativeElement.classList.remove('core-drawer-opened');
    }
  }

  _closeModalDrawer(): void {
    if (!this._drawer.disableClose) {
      this._drawer.close();
    }
  }

  /**
   * Recalculates and updates the inline styles for the content. Note that this should be used
   * sparingly, because it causes a reflow.
   */
  public _updateContentMargins(): void {
    console.log('updated !!!!', this._drawer.collapsedWidth);
    const margin = this._drawer.opened ? this._drawer.expandedWidth : this._drawer.collapsedWidth;
    this._contentMargin.next(margin);
  }
}
