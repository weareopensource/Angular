import { Injectable } from '@angular/core';
import { environment } from '@labdat/common/environments';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
declare const gapi;

@Injectable()
export class GoogleSignInService {
  private _auth2: any;

  constructor() {
    gapi.load('auth2', () => {
      this._auth2 = gapi.auth2.init({
        client_id: environment.authentication.providers.google.clientid,
        fetch_basic_profile: true
      });
    });
  }

  signIn(): Observable<any> {
    return fromPromise(this._auth2.signIn())
    .pipe(map((googleUser: any) => googleUser.getAuthResponse().id_token));
  }

  signOut(): Promise<any> {
    return this._auth2.signOut();
  }
}
