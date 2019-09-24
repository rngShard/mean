import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http : HttpClient) {}

  getUsers(): Observable <User[]> {
    // return Observable.create(observer => {
    //   let dummyUsers = [
    //     {
    //       username: 'some',
    //       email: 'thing',
    //       createdAt: new Date,
    //       roles: []
    //     }
    //   ];
    //   observer.next(dummyUsers);
    //   observer.complete();
    // });
    return Observable.create(observer => {
      this.http.get('/api/user').subscribe(data => {
        observer.next(data);
        observer.complete();
      }, error => observer.error());
    });
  }
}
