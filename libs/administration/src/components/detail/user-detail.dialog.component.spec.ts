import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailDialogComponent } from './user-detail.dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { combineReducers, StoreModule } from '@ngrx/store';
import { authenticationReducers } from '@labdat/authentication';
import { userReducer } from '@labdat/administration';
import { userReducer } from '@labdat/administration';
import { routerReducer } from '@ngrx/router-store';

describe('UserDetailDialogComponent', () => {
  let component: UserDetailDialogComponent;
  let fixture: ComponentFixture<UserDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers),
          user: combineReducers(userReducer),
          router: combineReducers(routerReducer)
        })
      ],
      declarations: [ UserDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
