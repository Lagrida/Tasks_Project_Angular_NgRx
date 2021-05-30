import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { usersService } from '../backend';
import { LoginType, UserAuth } from '../models/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly USER_LOCAL_STORAGE = 'user_auth';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User>{
    const url = usersService + 'addUser';
    /*const obs$ = of(user);
    return obs$;*/
    return this.http.post<User>(url, user);
  }
  login(user: LoginType): Observable<User>{
    const url = usersService + 'auth';
    /*const obs$ = of(user);
    return obs$;*/
    return this.http.post<User>(url, user);
  }
  setUserInLocalStorage(user: UserAuth){
    localStorage.setItem(this.USER_LOCAL_STORAGE, JSON.stringify(user));
  }
  getUserFromLocalStorage(){
    const userString = localStorage.getItem(this.USER_LOCAL_STORAGE);
    if(userString != null){
      const user: UserAuth = JSON.parse(userString);
      return user;
    }
    return null;
  }
  isConnected(){
    return localStorage.getItem(this.USER_LOCAL_STORAGE) !== null;
  }
  getUser(){
    if(this.isConnected()){
      return this.getUserFromLocalStorage()?.user;
    }
    return null;
  }
}
