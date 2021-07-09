import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { usersService } from '../backend';
import { LoginType, UserAuth } from '../models/auth';
import { TaskUser } from '../models/full-task';
import { PageableUsers } from '../models/pageable-users';
import { User } from '../models/user';
import { AppState } from '../reducers';
import { ROLES, RolesInterface } from '../roles';
import { logout } from '../users/store/users-action.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly USER_LOCAL_STORAGE = 'user_auth';

  autoLogout: any = null;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  addUser(user: User): Observable<User>{
    const url = usersService + 'addUser';
    /*const obs$ = of(user);
    return obs$;*/
    return this.http.post<User>(url, user);
  }
  setUser(user: User, id: number): Observable<User>{
    const url = usersService + 'update_profile/' + id;
    /*const obs$ = of(user);
    return obs$;*/
    return this.http.patch<User>(url, user);
  }
  getOneUser(id: number): Observable<User>{
    const url = usersService + 'get_user/' + id;
    return this.http.get<User>(url);
  }
  getUsersStartsWith(startsWith: string): Observable<TaskUser>{
    const url = usersService + 'get_users/' + startsWith;
    return this.http.get<TaskUser>(url);
  }
  getUsers(pageNumber: number, pageSize: number): Observable<PageableUsers>{
    const url = usersService + 'get_all_users/' + pageNumber + '/' + pageSize;
    return this.http.get<PageableUsers>(url);
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
  getUserFromLocalStorage(): UserAuth{
    const userString = localStorage.getItem(this.USER_LOCAL_STORAGE);
    const user: UserAuth = JSON.parse(userString ?? 'null');
    if(user != null){
      this.autoLogoutAfterTokenExpiration(user);
    }
    return user;
  }
  autoLogoutAfterTokenExpiration(user: UserAuth){
    const expirationDate = new Date(user.auth.expirationAt).getTime();
    const NowTime = (new Date()).getTime();
    const timeIntervalCalc = expirationDate - NowTime;
    const timeInterval = timeIntervalCalc > 0 ? timeIntervalCalc : 0;
    this.autoLogout = setTimeout(() => {
      this.store.dispatch(logout());
    }, timeInterval);
  }
  isConnected(){
    return localStorage.getItem(this.USER_LOCAL_STORAGE) !== null;
  }
  getUser(): User{
    return this.getUserFromLocalStorage().user;
  }
  getFullUser(): UserAuth | null{
    if(this.isConnected()){
      return this.getUserFromLocalStorage();
    }
    return null;
  }
  logout(){
    if(this.isConnected()){
      if (this.autoLogout) {
        clearTimeout(this.autoLogout);
        this.autoLogout = null;
      }
      localStorage.removeItem(this.USER_LOCAL_STORAGE);
    }
  }
  getRole(roleIndex: string): string{
    const role = ROLES[roleIndex as keyof RolesInterface];
    return role.replace("ROLE_", "");
  }
  getRoles(roles: string[]): string{
    let result = '';
    roles.forEach(role => {
      result += this.getRole(role) + ', ';
    });
    return result.substring(0, result.length - 2);
  }
}
