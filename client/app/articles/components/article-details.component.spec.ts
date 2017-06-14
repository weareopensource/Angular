import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailsComponent } from './article-details.component';
import {ArticlesService} from '../services/articles.service';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;
  const ArticlesServiceMock = {
        'author': 'test',
        'content': 'test ukuytestest',
        'title': 'tester',
        'created': '2001-06-02T22:00:00.000Z',
        'isCurrentUserOwner': false};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailsComponent ],
      imports: [MaterialModule, RouterTestingModule],
      providers : [{provide: ArticlesService, useValue : ArticlesServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 });
