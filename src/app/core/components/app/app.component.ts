import { Component, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { startWith } from 'rxjs/operators/startWith';
import { values, difference, isEmpty } from 'lodash';
import * as CoreActions from '../../store/core.actions';
import { CoreState } from '../../store';
import { CoreSelectors } from '../../store';
import { AuthenticationSelectors } from 'app/authentication/store';
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

  public menuItems$;
  public isSidenavOpened$ = this.store.select(this.coreSelectors.getShowSidenav);
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
    const items$ = this.store.select(this.coreSelectors.getMenuItems);
    const user$ = this.store.select(this.authenticationSelectors.getUser);
    this.menuItems$ = combineLatest(
      items$,
      user$,
      (items, user) => values(items)
        .filter(item => user && !isEmpty(difference(item.roles, user.roles)))
        .filter(items => !isEmpty(items))
    );
  }

  public openSidenav() {
    this.store.dispatch(new CoreActions.OpenSidenav());
  }

  public closeSidenav() {
    this.store.dispatch(new CoreActions.CloseSidenav());
  }
}
