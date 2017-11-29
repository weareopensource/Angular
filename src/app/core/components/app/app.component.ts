import { Component, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/store/app';
import * as fromCore from 'app/core/store';
import * as fromAuth from 'app/authentication/store';
import * as fromRouter from 'app/store/router';
import { Observable } from 'rxjs/Observable';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { startWith } from 'rxjs/operators/startWith';

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

  private isSidenavOpened$ = this.store.select(fromCore.getShowSidenav);  
  public isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);

  constructor(
    private mdIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private store: Store<fromRoot.State>) {
    ['file', 'editor', 'action', 'navigation', 'av', 'image']
    .forEach(iconSet =>
      mdIconRegistry.addSvgIconSetInNamespace(iconSet, sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`
    )));
    mdIconRegistry.addSvgIcon('file-image', sanitizer.bypassSecurityTrustResourceUrl(`assets/file.svg`));
  }

  public openSidenav() {
    this.store.dispatch(new fromCore.OpenSidenav());
  }

  public closeSidenav() {
    this.store.dispatch(new fromCore.CloseSidenav());
  }

  public logout() {
    this.store.dispatch(new fromAuth.Logout());
  }

  public login() {
    this.store.dispatch(new fromRouter.Go({ path: ['/', 'auth'] }));
  }

}
