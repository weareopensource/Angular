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
import { CoreState } from '../../store/core.interfaces';
import { CoreSelectorsService } from '../../store/core.selectors.service';
import { AuthenticationSelectorsService } from 'app/authentication';
import { MenuItem } from '../../models/menu.item';
import { map } from 'rxjs/operators/map';

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
  public isSidenavOpened$ = this.store.select(this.coreSelectorsService.getShowSidenav);
  public isLoggedIn$ = this.store.select(this.authenticationSelectorsService.getLoggedIn);

  constructor(
    private mdIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store<CoreState>,
    private router: Router,
    private authenticationSelectorsService: AuthenticationSelectorsService,
    private coreSelectorsService: CoreSelectorsService,
    
  ) {
    ['file', 'editor', 'action', 'navigation', 'av', 'image', 'content']
    .forEach(iconSet =>
      mdIconRegistry.addSvgIconSetInNamespace(iconSet, sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`
    )));
    mdIconRegistry.addSvgIcon('file-image', sanitizer.bypassSecurityTrustResourceUrl(`assets/file.svg`));
  }

  ngOnInit() {
    const items$ = this.store.select(this.coreSelectorsService.getMenuItems);
    const user$ = this.store.select(this.authenticationSelectorsService.getUser);
    this.menuItems$ = items$.pipe(
      combineLatest(user$),
      map(([items, user]) => values(items)
        .filter(item => user && !isEmpty(difference(item.roles, user.roles)))
        .filter(items => !isEmpty(items))
      )
    );
  }

  public openSidenav() {
    this.store.dispatch(new CoreActions.OpenSidenav());
  }

  public closeSidenav() {
    this.store.dispatch(new CoreActions.CloseSidenav());
  }
}
