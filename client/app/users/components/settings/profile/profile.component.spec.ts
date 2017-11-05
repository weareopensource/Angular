import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { SessionActions } from '../../../core/index';
import { NgReduxModule } from '@angular-redux/store';
import { UsersService } from '../../services/users.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const sessionActionMock = {};
  class UsersServiceLock {
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, NgReduxModule],
      providers: [
        { provide: SessionActions, useValue: sessionActionMock },
        {provide: UsersService, useClass: UsersServiceLock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
