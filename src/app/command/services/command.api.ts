import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommandApi {

  private baseUrl = 'api';

  constructor(private http: HttpClient) { }
  handle(id) { return this.http.post(`/${this.baseUrl}/commands`, { id }); }

  getHandled() { return this.http.get(`https://localhost:4200/${this.baseUrl}/commands`); }
}
