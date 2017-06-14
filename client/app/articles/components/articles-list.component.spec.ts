import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesListComponent } from './articles-list.component';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleComponent } from './article.component';
import { ArticlesService } from '../services/articles.service';
import { Observable } from 'rxjs/Rx';
describe('ArticlesListComponent', () => {
  let component: ArticlesListComponent;
  let fixture: ComponentFixture<ArticlesListComponent>;
  class ArticlesServiceMock {
    getArticles() {
      return Observable.of([{
        'author': 'test',
        'content': 'test ukuytestest',
        'title': 'tester',
        'created': '2001-06-02T22:00:00.000Z'
      },
      {
        'author': 'user01',
        'content': 'testkytk testest',
        'title': 'test',
        'created': '2001-06-01T22:00:00.000Z'
      },
      {
        'author': 'user01',
        'content': 'testytkyt testest',
        'title': 'testikk',
        'created': '2001-06-01T22:00:00.000Z'
      }]
      );
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesListComponent, ArticleComponent],
      imports: [MaterialModule, RouterTestingModule],
      providers: [{ provide: ArticlesService, useClass: ArticlesServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
