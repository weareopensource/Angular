import { AnimationEvent } from '@angular/animations';
import { FocusMonitor, FocusOrigin, FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, take, takeUntil } from 'rxjs/operators';
import { coreDrawerAnimations } from './drawer-animations';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/** Throws an exception when two CoreDrawer are matching the same position. */
export function throwMatDuplicatedDrawerError(position: string) {
  throw Error(`A drawer was already declared for 'position="${position}"'`);
}

/** Result of the toggle promise that indicates the state of the drawer. */
export type CoreDrawerToggleResult = 'open' | 'close';

/** Configures whether drawers should use auto sizing by default. */
export const MAT_DRAWER_DEFAULT_AUTOSIZE =
    new InjectionToken<boolean>('MAT_DRAWER_DEFAULT_AUTOSIZE', {
      providedIn: 'root',
      factory: MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY
    });

/** @docs-private */
export function MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY(): boolean {
  return false;
}

@Component({
  moduleId: module.id,
  selector: 'core-drawer-content',
  template: '<ng-content></ng-content>',
  host: {
    class: 'core-drawer-content',
    '[style.margin-left.px]': '_container._contentMargins.left',
    '[style.margin-right.px]': '_container._contentMargins.right'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CoreDrawerContent implements AfterContentInit {
  constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      @Inject(forwardRef(() => CoreDrawerContainer)) public _container: CoreDrawerContainer) {
  }

  ngAfterContentInit() {
    this._container._contentMarginChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }
}

/**
 * This component corresponds to a drawer that can be opened on the drawer container.
 */
@Component({
  moduleId: module.id,
  selector: 'core-drawer',
  exportAs: 'coreDrawer',
  template: '<ng-content></ng-content>',
  animations: [coreDrawerAnimations.transformDrawer],
  host: {
    '[@transform]': '_animationState',
    class: 'core-drawer',
    '(@transform.start)': '_onAnimationStart($event)',
    '(@transform.done)': '_onAnimationEnd($event)',
    // must prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[class.core-drawer-end]': 'position === "end"',
    '[class.core-drawer-over]': 'mode === "over"',
    '[class.core-drawer-push]': 'mode === "push"',
    '[class.core-drawer-side]': 'mode === "side"',
    tabIndex: '-1'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CoreDrawer implements AfterContentInit, AfterContentChecked, OnDestroy {
  private _focusTrap: FocusTrap;
  private _elementFocusedBeforeDrawerWasOpened: HTMLElement | null = null;

  /** Whether the drawer is initialized. Used for disabling the initial animation. */
  private _enableAnimations = false;

  /** The side that the drawer is attached to. */
  @Input()
  get position(): 'start' | 'end' { return this._position; }
  set position(value: 'start' | 'end') {
    // Make sure we have a valid value.
    value = value === 'end' ? 'end' : 'start';
    if (value !== this._position) {
      this._position = value;
      this.onPositionChanged.emit();
    }
  }
  private _position: 'start' | 'end' = 'start';

  /** Mode of the drawer; one of 'over', 'push' or 'side'. */
  @Input()
  get mode(): 'over' | 'push' | 'side' { return this._mode; }
  set mode(value: 'over' | 'push' | 'side') {
    this._mode = value;
    this._modeChanged.next();
  }
  private _mode: 'over' | 'push' | 'side' = 'over';

  /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
  @Input()
  get disableClose(): boolean { return this._disableClose; }
  set disableClose(value: boolean) { this._disableClose = coerceBooleanProperty(value); }
  private _disableClose = false;

  /** Whether the drawer should focus the first focusable element automatically when opened. */
  @Input()
  get autoFocus(): boolean { return this._autoFocus; }
  set autoFocus(value: boolean) { this._autoFocus = coerceBooleanProperty(value); }
  private _autoFocus = true;

  @Input()
  get collapsedWidth(): number {
    return this._collapsedWidth;
  }
  set collapsedWidth(value) {
    this._collapsedWidth = value;
    if (!this.opened) {
      this._elementRef.nativeElement.style.width = `${value}px`;
    }
  }

  public _collapsedWidth: number;

  /** Current state of the sidenav animation. */
  public _animationState = { value: 'void', params: { collapsedWidth: this._collapsedWidth } };

  /** How the sidenav was opened (keypress, mouse click etc.) */
  private _openedVia: FocusOrigin | null;

  /** Emits whenever the drawer has started animating. */
  _animationStarted = new EventEmitter<AnimationEvent>();

  /** Event emitted when the drawer open state is changed. */
  @Output() readonly openedChange: EventEmitter<boolean> =
      // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
      new EventEmitter<boolean>(true);

  /** Event emitted when the drawer has been opened. */
  @Output('opened')
  get _openedStream(): Observable<void> {
    return this.openedChange.pipe(filter(o => o), map(() => {}));
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
    return this._animationStarted.pipe(
      filter(e => e.fromState !== e.toState && e.toState === 'void'),
      map(() => {})
    );
  }

  /** Event emitted when the drawer's position changes. */
  // tslint:disable-next-line:no-output-on-prefix
  @Output('positionChanged') onPositionChanged: EventEmitter<void> = new EventEmitter<void>();

  /**
   * An observable that emits when the drawer mode changes. This is used by the drawer container to
   * to know when to when the mode changes so it can adapt the margins on the content.
   */
  readonly _modeChanged = new Subject();

  get _isFocusTrapEnabled(): boolean {
    // The focus trap is only enabled when the drawer is open in any mode other than side.
    return this.opened && this.mode !== 'side';
  }

  constructor(private _elementRef: ElementRef,
              private _focusTrapFactory: FocusTrapFactory,
              private _focusMonitor: FocusMonitor,
              private _platform: Platform,
              private _ngZone: NgZone,
              @Optional() @Inject(DOCUMENT) private _doc: any) {

    this.openedChange.subscribe((opened: boolean) => {
      if (opened) {
        if (this._doc) {
          this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement as HTMLElement;
        }

        if (this._isFocusTrapEnabled && this._focusTrap) {
          this._trapFocus();
        }
      } else {
        this._restoreFocus();
      }
    });

    /**
     * Listen to `keydown` events outside the zone so that change detection is not run every
     * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed
     * and we don't have close disabled.
     */
    this._ngZone.runOutsideAngular(() => {
      fromEvent(this._elementRef.nativeElement, 'keydown').pipe(
            filter((event: KeyboardEvent) => event.keyCode === ESCAPE && !this.disableClose)
        ).subscribe(event => this._ngZone.run(() => {
          this.close();
          event.stopPropagation();
        }));
    });
  }

  /** Traps focus inside the drawer. */
  private _trapFocus() {
    if (!this.autoFocus) {
      return;
    }

    this._focusTrap.focusInitialElementWhenReady().then(hasMovedFocus => {
      // If there were no focusable elements, focus the sidenav itself so the keyboard navigation
      // still works. We need to check that `focus` is a function due to Universal.
      if (!hasMovedFocus && typeof this._elementRef.nativeElement.focus === 'function') {
        this._elementRef.nativeElement.focus();
      }
    });
  }

  /**
   * If focus is currently inside the drawer, restores it to where it was before the drawer
   * opened.
   */
  private _restoreFocus() {
    if (!this.autoFocus) {
      return;
    }

    const activeEl = this._doc && this._doc.activeElement;

    if (activeEl && this._elementRef.nativeElement.contains(activeEl)) {
      if (this._elementFocusedBeforeDrawerWasOpened instanceof HTMLElement) {
        this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
      } else {
        this._elementRef.nativeElement.blur();
      }
    }

    this._elementFocusedBeforeDrawerWasOpened = null;
    this._openedVia = null;
  }

  ngAfterContentInit() {
    this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
    this._focusTrap.enabled = this._isFocusTrapEnabled;
  }

  ngAfterContentChecked() {
    // Enable the animations after the lifecycle hooks have run, in order to avoid animating
    // drawers that are open by default. When we're on the server, we shouldn't enable the
    // animations, because we don't want the drawer to animate the first time the user sees
    // the page.
    if (this._platform.isBrowser) {
      this._enableAnimations = true;
    }
  }

  ngOnDestroy() {
    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }

  /**
   * Whether the drawer is opened. We overload this because we trigger an event when it
   * starts or end.
   */
  @Input()
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) { this.toggle(coerceBooleanProperty(value)); }
  private _opened = false;

  /**
   * Open the drawer.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  open(openedVia?: FocusOrigin): Promise<CoreDrawerToggleResult> {
    return this.toggle(true, openedVia);
  }

  /** Close the drawer. */
  close(): Promise<CoreDrawerToggleResult> {
    return this.toggle(false);
  }

  /**
   * Toggle this drawer.
   * @param isOpen Whether the drawer should be open.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  toggle(isOpen: boolean = !this.opened, openedVia: FocusOrigin = 'program'):
    Promise<CoreDrawerToggleResult> {

    this._opened = isOpen;

    if (isOpen) {
      this._animationState = { value: this._enableAnimations ? 'open' : 'open-instant', params: { collapsedWidth: this.collapsedWidth } };
      this._openedVia = openedVia;
    } else {
      this._animationState = { value: 'void', params: { collapsedWidth: this.collapsedWidth } };
      this._restoreFocus();
    }

    if (this._focusTrap) {
      this._focusTrap.enabled = this._isFocusTrapEnabled;
    }

    return new Promise<CoreDrawerToggleResult>(resolve => {
      this.openedChange.pipe(take(1)).subscribe(open => resolve(open ? 'open' : 'close'));
    });
  }

  _onAnimationStart(event: AnimationEvent) {
    this._animationStarted.emit(event);
  }

  _onAnimationEnd(event: AnimationEvent) {
    const { fromState, toState } = event;

    if ((toState.indexOf('open') === 0 && fromState === 'void') ||
        (toState === 'void' && fromState.indexOf('open') === 0)) {
      this.openedChange.emit(this._opened);
    }
  }

  get _width(): number {
    return this._elementRef.nativeElement ? (this._elementRef.nativeElement.offsetWidth || 0) : 0;
  }
}

/**
 * `<core-drawer-container>` component.
 *
 * This is the parent component to one or two `<core-drawer>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
@Component({
  moduleId: module.id,
  selector: 'core-drawer-container',
  exportAs: 'coreDrawerContainer',
  templateUrl: 'drawer-container.html',
  styleUrls: ['drawer.scss'],
  host: {
    class: 'core-drawer-container',
    '[class.core-drawer-container-explicit-backdrop]': '_backdropOverride'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CoreDrawerContainer implements AfterContentInit, DoCheck, OnDestroy {
  @ContentChildren(CoreDrawer) _drawers: QueryList<CoreDrawer>;
  @ContentChild(CoreDrawerContent) _content: CoreDrawerContent;

  @Input()
  get collapsedWidth(): number {
    return this._collapsedWidth;
  }
  set collapsedWidth(value) {
    this._collapsedWidth = value;
  }

  public _collapsedWidth = 0;

  /** The drawer child with the `start` position. */
  get start(): CoreDrawer | null { return this._start; }

  /** The drawer child with the `end` position. */
  get end(): CoreDrawer | null { return this._end; }

  /**
   * Whether to automatically resize the container whenever
   * the size of any of its drawers changes.
   *
   * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
   * the drawers on every change detection cycle. Can be configured globally via the
   * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
   */
  @Input()
  get autosize(): boolean { return this._autosize; }
  set autosize(value: boolean) { this._autosize = coerceBooleanProperty(value); }
  private _autosize: boolean;

  /**
   * Whether the drawer container should have a backdrop while one of the sidenavs is open.
   * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
   * mode as well.
   */
  @Input()
  get hasBackdrop() {
    if (this._backdropOverride === undefined) {
      return !this._start || this._start.mode !== 'side' || !this._end || this._end.mode !== 'side';
    }

    return this._backdropOverride;
  }
  set hasBackdrop(value: any) {
    this._backdropOverride = value === undefined ? null : coerceBooleanProperty(value);
  }
  _backdropOverride: boolean | null;

  /** Event emitted when the drawer backdrop is clicked. */
  @Output() readonly backdropClick: EventEmitter<void> = new EventEmitter<void>();

  /** The drawer at the start/end position, independent of direction. */
  private _start: CoreDrawer | null;
  private _end: CoreDrawer | null;

  /**
   * The drawer at the left/right. When direction changes, these will change as well.
   * They're used as aliases for the above to set the left/right style properly.
   * In LTR, _left == _start and _right == _end.
   * In RTL, _left == _end and _right == _start.
   */
  private _left: CoreDrawer | null;
  private _right: CoreDrawer | null;

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  /** Emits on every ngDoCheck. Used for debouncing reflows. */
  private readonly _doCheckSubject = new Subject<void>();

  /**
   * Margins to be applied to the content. These are used to push / shrink the drawer content when a
   * drawer is open. We use margin rather than transform even for push mode because transform breaks
   * fixed position elements inside of the transformed element.
   */
  _contentMargins: {left: number|null, right: number|null} = { left: null, right: null };

  readonly _contentMarginChanges = new Subject<{left: number|null, right: number|null}>();

  /** Reference to the CdkScrollable instance that wraps the scrollable content. */
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;

  constructor(@Optional() private _dir: Directionality,
              private _element: ElementRef,
              private _ngZone: NgZone,
              private _changeDetectorRef: ChangeDetectorRef,
              @Inject(MAT_DRAWER_DEFAULT_AUTOSIZE) defaultAutosize = false,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) private _animationMode?: string) {

    // If a `Dir` directive exists up the tree, listen direction changes
    // and update the left/right properties to point to the proper start/end.
    if (_dir) {
      _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._validateDrawers();
        this._updateContentMargins();
      });
    }

    this._autosize = defaultAutosize;
  }


  ngAfterContentInit() {

    this._contentMargins = { left: this._collapsedWidth, right: 0 };
    this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins));

    this._drawers.changes.pipe(startWith(null)).subscribe(() => {
      this._validateDrawers();

      this._drawers.forEach((drawer: CoreDrawer) => {
        this._watchDrawerToggle(drawer);
        this._watchDrawerPosition(drawer);
        this._watchDrawerMode(drawer);
      });

      if (!this._drawers.length ||
          this._isDrawerOpen(this._start) ||
          this._isDrawerOpen(this._end)) {
        this._updateContentMargins();
      }

      this._changeDetectorRef.markForCheck();
    });

    this._doCheckSubject.pipe(
      debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
      takeUntil(this._destroyed)
    ).subscribe(() => this._updateContentMargins());
  }

  ngOnDestroy() {
    this._doCheckSubject.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Calls `open` of both start and end drawers */
  open(): void {
    this._drawers.forEach(drawer => drawer.open());
  }

  /** Calls `close` of both start and end drawers */
  close(): void {
    this._drawers.forEach(drawer => drawer.close());
  }

  ngDoCheck() {
    // If users opted into autosizing, do a check every change detection cycle.
    if (this._autosize && this._isPushed()) {
      // Run outside the NgZone, otherwise the debouncer will throw us into an infinite loop.
      this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
    }
  }

  /**
   * Subscribes to drawer events in order to set a class on the main container element when the
   * drawer is open and the backdrop is visible. This ensures any overflow on the container element
   * is properly hidden.
   */
  private _watchDrawerToggle(drawer: CoreDrawer): void {
    drawer._animationStarted.pipe(
      takeUntil(this._drawers.changes),
      filter((event: AnimationEvent) => event.fromState !== event.toState)
    )
    .subscribe((event: AnimationEvent) => {
      // Set the transition class on the container so that the animations occur. This should not
      // be set initially because animations should only be triggered via a change in state.
      if (event.toState !== 'open-instant' && this._animationMode !== 'NoopAnimations') {
        this._element.nativeElement.classList.add('core-drawer-transition');
      }

      this._updateContentMargins();
      this._changeDetectorRef.markForCheck();
    });

    if (drawer.mode !== 'side') {
      drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(() =>
          this._setContainerClass(drawer.opened));
    }
  }

  /**
   * Subscribes to drawer onPositionChanged event in order to
   * re-validate drawers when the position changes.
   */
  private _watchDrawerPosition(drawer: CoreDrawer): void {
    if (!drawer) {
      return;
    }
    // NOTE: We need to wait for the microtask queue to be empty before validating,
    // since both drawers may be swapping positions at the same time.
    drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(() => {
      this._ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(() => {
        this._validateDrawers();
      });
    });
  }

  /** Subscribes to changes in drawer mode so we can run change detection. */
  private _watchDrawerMode(drawer: CoreDrawer): void {
    if (drawer) {
      drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed)))
        .subscribe(() => {
          this._updateContentMargins();
          this._changeDetectorRef.markForCheck();
        });
    }
  }

  /** Toggles the 'core-drawer-opened' class on the main 'core-drawer-container' element. */
  private _setContainerClass(isAdd: boolean): void {
    if (isAdd) {
      this._element.nativeElement.classList.add('core-drawer-opened');
    } else {
      this._element.nativeElement.classList.remove('core-drawer-opened');
    }
  }

  /** Validate the state of the drawer children components. */
  private _validateDrawers() {
    this._start = this._end = undefined;

    // Ensure that we have at most one start and one end drawer.
    this._drawers.forEach(drawer => {
      if (drawer.position === 'end') {
        if (this._end !== undefined) {
          throwMatDuplicatedDrawerError('end');
        }
        this._end = drawer;
      } else {
        if (this._start !== undefined) {
          throwMatDuplicatedDrawerError('start');
        }
        this._start = drawer;
      }
    });

    this._right = this._left = null;

    // Detect if we're LTR or RTL.
    if (this._dir && this._dir.value === 'rtl') {
      this._left = this._end;
      this._right = this._start;
    } else {
      this._left = this._start;
      this._right = this._end;
    }
  }

  /** Whether the container is being pushed to the side by one of the drawers. */
  private _isPushed() {
    return (this._isDrawerOpen(this._start) && this._start.mode !== 'over') ||
           (this._isDrawerOpen(this._end) && this._end.mode !== 'over');
  }

  _onBackdropClicked() {
    this.backdropClick.emit();
    this._closeModalDrawer();
  }

  _closeModalDrawer() {
    // Close all open drawers where closing is not disabled and the mode is not `side`.
    [this._start, this._end]
      .filter(drawer => drawer && !drawer.disableClose && this._canHaveBackdrop(drawer))
      .forEach(drawer => drawer!.close());
  }

  _isShowingBackdrop(): boolean {
    return (this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start)) ||
           (this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end));
}

  private _canHaveBackdrop(drawer: CoreDrawer): boolean {
  return drawer.mode !== 'side' || !!this._backdropOverride;
}

  private _isDrawerOpen(drawer: CoreDrawer | null): drawer is CoreDrawer {
  return drawer !== undefined && drawer.opened;
}

  /**
   * Recalculates and updates the inline styles for the content. Note that this should be used
   * sparingly, because it causes a reflow.
   */
  private _updateContentMargins() {
    // 1. For drawers in `over` mode, they don't affect the content.
    // 2. For drawers in `side` mode they should shrink the content. We do this by adding to the
    //    left margin (for left drawer) or right margin (for right the drawer).
    // 3. For drawers in `push` mode the should shift the content without resizing it. We do this by
    //    adding to the left or right margin and simultaneously subtracting the same amount of
    //    margin from the other side.

    let left = this._collapsedWidth;
    let right = 0;

  if (this._left && this._left.opened) {
      if (this._left.mode === 'side') {
        left = 300;
      } else if (this._left.mode === 'push') {
        const width = this._left._width;

        left += width;
        right -= width;
      }
    }

    if (this._right && this._right.opened) {
      if (this._right.mode === 'side') {
        right += this._right._width;
      } else if (this._right.mode === 'push') {
        const width = this._right._width;
        right += width;
        left -= width;
      }
    }

    if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
    this._contentMargins = { left, right };

      // Pull back into the NgZone since in some cases we could be outside. We need to be careful
      // to do it only when something changed, otherwise we can end up hitting the zone too often.
    this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins));
  }

  }
}
