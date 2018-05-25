import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { CoreDrawer, CoreDrawerContainer, CoreDrawerContent } from './drawer.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'core-sidenav-content',
  template: '<ng-content></ng-content>',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'core-drawer-content core-sidenav-content',
    '[style.margin-left.px]': '_margin'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
// tslint:disable-next-line:component-class-suffix
export class CoreSidenavContent extends CoreDrawerContent {
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    // tslint:disable-next-line:no-forward-ref
    @Inject(forwardRef(() => CoreSidenavContainer))
    container: CoreSidenavContainer
  ) {
    super(changeDetectorRef, container);
  }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'core-sidenav',
  exportAs: 'CoreSidenav',
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
          width: '{{collapsedWidth}}px'
        }), { params: { collapsedWidth: 0 } }
      ),
      transition('close => open-instant', animate('0ms')),
      transition('close <=> open, open-instant => close', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'core-drawer core-sidenav',
    tabIndex: '-1',
    '(@transform.start)': '_onAnimationStart($event)',
    '(@transform.done)': '_onAnimationEnd($event)',
    '(keydown)': 'handleKeydown($event)',
    // must prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[class.core-drawer-end]': 'false',
    '[class.core-drawer-start]': 'true',
    '[class.core-drawer-side]': 'true',
    '[class.core-sidenav-fixed]': 'fixedInViewport',
    '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
    '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
// tslint:disable-next-line:component-class-suffix
export class CoreSidenav extends CoreDrawer {
  /** Whether the sidenav is fixed in the viewport. */
  @Input()
  get fixedInViewport(): boolean {
    return this._fixedInViewport;
  }
  set fixedInViewport(value) {
    this._fixedInViewport = coerceBooleanProperty(value);
  }
  private _fixedInViewport = false;

  /**
   * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
   * mode.
   */
  @Input()
  get fixedTopGap(): number {
    return this._fixedTopGap;
  }
  set fixedTopGap(value) {
    this._fixedTopGap = coerceNumberProperty(value);
  }
  private _fixedTopGap = 0;

  /**
   * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
   * fixed mode.
   */
  @Input()
  get fixedBottomGap(): number {
    return this._fixedBottomGap;
  }
  set fixedBottomGap(value) {
    this._fixedBottomGap = coerceNumberProperty(value);
  }
  private _fixedBottomGap = 0;

  @HostBinding('@transform')
  get animationState(): any {
    return { value: this._animationState, params: { collapsedWidth: this._collapsedWidth } };
  }

  @Input()
  get collapsedWidth(): number {
    return this._collapsedWidth;
  }
  set collapsedWidth(value) {
    this._collapsedWidth = value;
    this.collapsedWidthChange.emit();
  }

}

// tslint:disable-next-line:max-classes-per-file
@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'core-sidenav-container',
  exportAs: 'coreSidenavContainer',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./drawer.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'core-drawer-container core-sidenav-container'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
// tslint:disable-next-line:component-class-suffix
export class CoreSidenavContainer extends CoreDrawerContainer {
  @ContentChild(CoreSidenav) _drawer;

  @ContentChild(CoreSidenavContent) _content;
}
