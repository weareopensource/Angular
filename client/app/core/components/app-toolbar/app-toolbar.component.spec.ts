/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { SessionActions } from 'app/core';
import { AppToolbarComponent } from './app-toolbar.component';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../../services';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';



describe('AppToolbarComponent', () => {
  let component: AppToolbarComponent;
  let fixture: ComponentFixture<AppToolbarComponent>;
  const sessionActionMock = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppToolbarComponent ],
      imports: [MaterialModule, RouterTestingModule, AngularFontAwesomeModule, NgReduxTestingModule],
      providers: [{provide : SessionActions, useValue : sessionActionMock}, MenuService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
