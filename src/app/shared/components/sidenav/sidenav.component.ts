import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren, forwardRef, Inject, Input,
  ViewEncapsulation
} from '@angular/core';
import { Mean2Drawer, Mean2DrawerContainer, Mean2DrawerContent } from './drawer.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';


@Component({
  moduleId: module.id,
  selector: 'mean2-sidenav-content',
  template: '<ng-content></ng-content>',
  host: {
    'class': 'mean2-drawer-content mean2-sidenav-content',
    '[style.margin-left.px]': '_margin',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class Mean2SidenavContent extends Mean2DrawerContent {
  constructor(
      changeDetectorRef: ChangeDetectorRef,
      @Inject(forwardRef(() => Mean2SidenavContainer)) container: Mean2SidenavContainer) {
    super(changeDetectorRef, container);
  }
}


@Component({
  moduleId: module.id,
  selector: 'mean2-sidenav',
  exportAs: 'Mean2Sidenav',
  template: '<ng-content></ng-content>',
  animations: [
    trigger('transform', [
      state('open, open-instant', style({
        width: '300px',
      })),
      state('close', style({
        width: '70px',
      })),
      transition('close => open-instant', animate('0ms')),
      transition('close <=> open, open-instant => close',
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ],
  host: {
    'class': 'mean2-drawer mean2-sidenav',
    'tabIndex': '-1',
    '[@transform]': '_animationState',
    '(@transform.start)': '_onAnimationStart($event)',
    '(@transform.done)': '_onAnimationEnd($event)',
    '(keydown)': 'handleKeydown($event)',
    // must prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[class.mean2-drawer-end]': 'false',
    '[class.mean2-drawer-start]': 'true',
    '[class.mean2-drawer-side]': 'true',
    '[class.mean2-sidenav-fixed]': 'fixedInViewport',
    '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
    '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class Mean2Sidenav extends Mean2Drawer {
  /** Whether the sidenav is fixed in the viewport. */
  @Input()
  get fixedInViewport(): boolean { return this._fixedInViewport; }
  set fixedInViewport(value) { this._fixedInViewport = coerceBooleanProperty(value); }
  private _fixedInViewport = false;

  /**
   * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
   * mode.
   */
  @Input()
  get fixedTopGap(): number { return this._fixedTopGap; }
  set fixedTopGap(value) { this._fixedTopGap = coerceNumberProperty(value); }
  private _fixedTopGap = 0;

  /**
   * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
   * fixed mode.
   */
  @Input()
  get fixedBottomGap(): number { return this._fixedBottomGap; }
  set fixedBottomGap(value) { this._fixedBottomGap = coerceNumberProperty(value); }
  private _fixedBottomGap = 0;
}


@Component({
  moduleId: module.id,
  selector: 'mean2-sidenav-container',
  exportAs: 'Mean2SidenavContainer',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./drawer.css'],
  host: {
    'class': 'mean2-drawer-container mean2-sidenav-container',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class Mean2SidenavContainer extends Mean2DrawerContainer {
  @ContentChild(Mean2Sidenav)
  _drawer;

  @ContentChild(Mean2SidenavContent)
  _content;
}