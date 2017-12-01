import { Component, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Store } from '@ngrx/store';
import * as CoreSelectors from '../../store';
import * as CoreActions from '../../store';
import { Observable } from 'rxjs/Observable';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { startWith } from 'rxjs/operators/startWith';
import { AuthenticationStore } from 'app/authentication/services';
import { AppState } from 'app/store';
import { AppStore } from 'app/services';

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

  private isSidenavOpened$ = this.store.select(CoreSelectors.getShowSidenav);  
  public isLoggedIn$ = this.store.select(this.authenticationStore.getLoggedIn);

  constructor(
    private mdIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store<AppState>,
    private authenticationStore: AuthenticationStore,
    private appStore: AppStore,
  ) {
    ['file', 'editor', 'action', 'navigation', 'av', 'image', 'content']
    .forEach(iconSet =>
      mdIconRegistry.addSvgIconSetInNamespace(iconSet, sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`
    )));
    mdIconRegistry.addSvgIcon('file-image', sanitizer.bypassSecurityTrustResourceUrl(`assets/file.svg`));
  }

  public openSidenav() {
    this.store.dispatch(new CoreActions.OpenSidenav());
  }

  public closeSidenav() {
    this.store.dispatch(new CoreActions.CloseSidenav());
  }

  public logout() {
    this.store.dispatch(this.authenticationStore.logout());
  }

  public login() {
    this.store.dispatch(this.appStore.go({path: ['/', 'auth']}));
  }

}
