import { Component, OnInit, Input } from '@angular/core';
import {ArticlesService} from '../services/articles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})

export class ArticleDetailsComponent implements OnInit {
  article: any = {};
  private sub: any;
  id: any;

  constructor(private articlesService: ArticlesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
      this.articlesService.getArticle(params['id']).subscribe(
            data => {
            this.article = data;
      });
    }
   });

  }

}
