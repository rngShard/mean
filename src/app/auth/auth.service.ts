import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, observable } from 'rxjs';

import { TokenStorage } from './token.storage';

@Injectable()
export class AuthService {

  constructor(private http : HttpClient, private token: TokenStorage) {}

  public $userSource = new Subject<any>();

  login(email : string, password : string) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        email,
        password
      }).subscribe((data : any) => {
          observer.next({user: data.user});
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
      }, error => {
        observer.error(error);
      })
    });
  }

  register(username : string, email : string, password : string, repeatPassword : string) : Observable <any> {
    return Observable.create(observer => {
      const lang = this.getLanguage();
      this.http.post(`/api/auth/register/${lang}`, {
        username,
        email,
        password,
        repeatPassword
      }).subscribe((data : any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      }, error => observer.error(error));
    });
  }

  verify(id: string) {
    return Observable.create(observer => {
      const lang = this.getLanguage();
      const _id = id;
      this.http.post('/api/auth/verify', {
        _id
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      }, err => observer.error(err));
    });
  }

  setUser(user): void {
    if (user) {
      user.isSystemAcc = (user.roles.indexOf('system') > -1);
      user.isAdmin = (user.roles.indexOf('admin') > -1);
      user.isTrusted = (user.roles.indexOf('trusted') > -1);
      user.isVerified = (user.roles.indexOf('verified') > -1);
    }
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) return  observer.complete();
      this.http.get('/api/auth/me').subscribe((data : any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        observer.complete();
      })
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }

  getLanguage(): string {
    let path = window.location.pathname;  // e.g. '/en/'
    let lang = path.substring(1, 3);  // e.g. 'en'
    return lang;
  }
}
