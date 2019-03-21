import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TaskStateModule } from '../task-state.module';

@Injectable({
  providedIn: TaskStateModule
})
export class TaskApiService {
  private _baseUrl: string;
  private _endPoints: any;

  constructor(private _http: HttpClient) {
    const { protocol, host, port, endPoints } = environment.api;
    this._baseUrl = `${protocol}://${host}:${port}/${endPoints.basePath}`;
    this._endPoints = endPoints;
  }

  loadTasks(): Observable<any> {
    return this._http.get(`${this._baseUrl}/${this._endPoints.tasks}`)
    .pipe(pluck('data'));
  }

  addTask(task: Task): Observable<any> {
    return this._http.post(`${this._baseUrl}/${this._endPoints.tasks}`, task)
    .pipe(pluck('data'));
  }

  deleteTask(taskId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/${this._endPoints.tasks}/${taskId}`)
    .pipe(pluck('data'));
  }

  updateTask(task: any): Observable<any> {
    return this._http.put(`${this._baseUrl}/${this._endPoints.tasks}/${task.id}`, task.changes)
    .pipe(pluck('data'));
  }

  deleteImage(imageId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/${this._endPoints.media}/${imageId}`)
    .pipe(pluck('data'));
  }
}
