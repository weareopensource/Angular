import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSidenavComponent } from './app-sidenav.component';
import {  MenuService } from '../../services';

describe('AppSidenavComponent', () => {
  let component: AppSidenavComponent;
  let fixture: ComponentFixture<AppSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSidenavComponent ],
      imports: [MaterialModule, RouterTestingModule],
      providers: [ MenuService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
