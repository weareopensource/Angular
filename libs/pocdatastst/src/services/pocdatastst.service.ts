import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../apps/default/src/environments/environment';
import { User } from '@labdat/data-models';
import { PocExecution } from '../models/pocexecution';
import { getUser, AuthenticationState } from '@labdat/authentication-state';
import { isEmpty } from 'lodash';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class PocdataststService {
    private _baseUrl: string;
    private slides: any = {};
    private user: any;
    private progress$;
    private progressObserver;
    private progress;

    constructor(private http: Http, private store: Store<AuthenticationState>) {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer;
        }).share();
        this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            this._baseUrl += `:${environment.backend.port}`;
        }
        const user$: Observable<User> = this.store.select(getUser).pipe(
          filter(user => !isEmpty(user))
        )

        user$.subscribe(user => {
          this.user = {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              roles: user.roles,
              email: user.email
          };
        });
    }

    submitExecution(pocExec: PocExecution): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.pocdatastst}/${pocExec.id}`;
        return this.http.post(backendURL, pocExec.input).map((response: Response) => response.json());
    }

    getApisList(): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.apislist}`;
        return this.http.get(backendURL).map((response: Response) => response.json());
    }
}
