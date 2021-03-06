import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http : HttpClient) {}

  getUsers(): Observable <User[]> {
    return Observable.create(observer => {
      this.http.get('/api/user').subscribe(data => {
        observer.next(data);
        observer.complete();
      }, error => observer.error());
    });
  }

  toggleRole(email: string, role: string, assign: boolean) {
    return Observable.create(observer => {
      this.http.post(`/api/user/${email}/toggleRole`, {
        role: role,
        assign: assign
      }).subscribe(data => {
        observer.next(data);
        observer.complete();
      }, error => observer.error(error));
    });
  }

  deleteUser(email: string) {
    return Observable.create(observer => {
      this.http.delete(`/api/user/${email}`).subscribe(data => {
        observer.next(data);
        observer.complete();
      }, error => observer.error(error));
    })
  }
}
