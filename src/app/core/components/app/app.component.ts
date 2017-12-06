import { Component, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Store } from '@ngrx/store';
import * as CoreActions from '../../store/core.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/combineLatest';
import 'rxjs/add/operator/filter';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { startWith } from 'rxjs/operators/startWith';
import { CoreState } from '../../store';
import { Router } from '@angular/router';
import { CoreSelectors } from '../../store';
import { AuthenticationSelectors } from 'app/authentication/store';
import { values, difference, isEmpty } from 'lodash';
import { MenuItem } from '../../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @HostBinding('class.mat-typography')
  matTypo() {
    return true;
  }

  @HostListener('dragover', ['$event'])
  stoprDragover(event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  stopDrop(event) {
    event.preventDefault();
  }

  public isSidenavOpened$ = this.store.select(this.coreSelectors.getShowSidenav);

  public menuItems$: Observable<MenuItem[]>;
  public isLoggedIn$ = this.store.select(this.authenticationSelectors.getLoggedIn);

  constructor(
    private mdIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store<CoreState>,
    private router: Router,
    private authenticationSelectors: AuthenticationSelectors,
    private coreSelectors: CoreSelectors,
    
  ) {
    ['file', 'editor', 'action', 'navigation', 'av', 'image', 'content']
    .forEach(iconSet =>
      mdIconRegistry.addSvgIconSetInNamespace(iconSet, sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`
    )));
    mdIconRegistry.addSvgIcon('file-image', sanitizer.bypassSecurityTrustResourceUrl(`assets/file.svg`));
  }

  ngOnInit() {
    const menuItems$ = this.store.select(this.coreSelectors.getMenuItems);
    const user$ = this.store.select(this.authenticationSelectors.getUser);
    this.menuItems$ = Observable.combineLatest(
      menuItems$,
      user$,
      (menuItems, user) => values(menuItems).filter(menuItem => isEmpty(difference(user.roles, menuItem.roles))))
    .filter(menuItems => !isEmpty(menuItems))
    .do(console.log);
  }

  public openSidenav() {
    this.store.dispatch(new CoreActions.OpenSidenav());
  }

  public closeSidenav() {
    this.store.dispatch(new CoreActions.CloseSidenav());
  }
}
