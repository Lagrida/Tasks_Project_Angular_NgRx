import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../reducers';
import { getIsConnected } from '../users/store/global-users.selectors';


@Injectable({
  providedIn: 'root'
})
export class AuthTasksService implements CanActivate{

  constructor(private store: Store<AppState>, public router: Router) { }

  canActivate(): boolean | Observable<boolean> {
    return this.store.select(getIsConnected).pipe(
      map((val: boolean) => {
        if(!val){
          this.router.navigate(['/users/login']);
          return false;
        }
        return true;
      }
    ));
  }
}
