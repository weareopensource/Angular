import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';


@Injectable()
export class ArticlesService {
  private _baseUrl: string;
  constructor(private http: Http) {
    this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      this._baseUrl += `:${environment.backend.port}`;
      }
    }
    getArticles(): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.articles}` ;
        return this.http.get(backendURL).map((response: Response) => response.json());
    }
    getArticle(id_article): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.articles}/${id_article}` ;
        return this.http.get(backendURL).map((response: Response) => response.json());
    }
 }
