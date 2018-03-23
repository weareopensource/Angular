import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '@labdat/data-models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskApiService {
  constructor(private http: HttpClient) {}

  loadTasks(): Observable<any> {
    return this.http.get('http://localhost:3000/api/tasks');
  }

  addTask(task: Task): Observable<any> {
    return this.http.post('http://localhost:3000/api/tasks', task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/tasks/${taskId}`);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/tasks/`, task.changes);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/media/${imageId}`);
  }
}
