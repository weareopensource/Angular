import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '@labdat/data-models';

@Injectable()
export class TaskApiService {
  constructor(private http: HttpClient) {}

  loadTasks() {
    return this.http.get(`http://localhost:3000/api/tasks`);
  }

  addTask(task: Task) {
    return this.http.post(`http://localhost:3000/api/tasks`, task);
  }

  deleteTask(taskId: string) {
    return this.http.delete(`http://localhost:3000/api/tasks/${taskId}`);
  }

  updateTask(task: Task) {
    return this.http.patch(`http://localhost:3000/api/tasks/${task.id}`, task);
  }

  deleteImage(imageId: string) {
    return this.http.delete(`http://localhost:3000/api/media/${imageId}`);
  }
}
