import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommandApiService {

  private baseUrl = 'api';

  constructor(private http: HttpClient) { }
  handle(id) { return this.http.post(`/${this.baseUrl}/commands`, { id }); }

  getHandled() { return this.http.get(`https://localhost:4200/${this.baseUrl}/commands`); }
}
