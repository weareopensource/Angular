import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@labdat/data-models';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class UserApiService {
  constructor(private http: HttpClient) {}

  loadUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/users')
    .pipe(map((users: Array<User>) => users.map(user => ({ ...user, id: user._id }))));
  }

  addUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/api/users', user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/users/${userId}`)
    .pipe(map((user: any) => ({ ...user, id: user._id })));
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/users/${user.id}`, user.changes);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/media/${imageId}`);
  }
}
