import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../services/articles.service';

@Component({
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})

export class ArticlesListComponent implements OnInit {
  articles =[];
  constructor(private articlesService : ArticlesService) {

  }

  ngOnInit() {
    this.articlesService.getArticles().subscribe(
          data => {
            console.log(data);
          this.articles = data;
    });
  }
}
