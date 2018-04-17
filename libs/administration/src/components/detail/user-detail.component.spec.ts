import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { combineReducers, StoreModule } from '@ngrx/store';
import { authenticationReducers } from '@labdat/authentication';
import { userReducer } from '@labdat/administration';
import { routerReducer } from '@ngrx/router-store';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers),
          user: combineReducers(userReducer, { entities: {} }),
          router: combineReducers(routerReducer, { state: {
            params: {},
            queryParams: {},
            url: "/admin/users/1"
          }})
        })
      ],
      declarations: [ UserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
