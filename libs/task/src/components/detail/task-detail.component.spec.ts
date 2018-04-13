import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailComponent } from './task-detail.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { combineReducers, StoreModule } from '@ngrx/store';
import { taskReducer } from '../../+state/task.reducer';
import { routerReducer } from '@ngrx/router-store';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        StoreModule.forRoot({
          router: combineReducers(routerReducer),
          task: combineReducers(taskReducer)
        })
      ],
      declarations: [ TaskDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
