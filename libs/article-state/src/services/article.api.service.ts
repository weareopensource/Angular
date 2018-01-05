import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';

@Injectable()
export class ArticleApiService {

  constructor(private http: HttpClient) { }

  loadArticles() {
    return this.http.get(`https://localhost:3000/api/articles`);
  }

  addArticle(article: Article) {
    return this.http.post(`https://localhost:3000/api/articles`, article);
  }

  deleteArticle(articleId: string) {
    return this.http.delete(`https://localhost:3000/api/articles/${articleId}`);
  }

  updateArticle(article: Article) {
    return this.http.patch(`https://localhost:3000/api/articles/${article.id}`, article);
  }

  deleteImage(imageId: string) {
    return this.http.delete(`https://localhost:3000/api/media/${imageId}`);
  }
}
