import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AppState } from '.';
import { UsersService } from '../services/users.service';
import { initTasksStore } from '../tasks/store/tasks.actions';
import { loginUserSuccess, logout, tryLogin } from '../users/store/users-action.actions';



@Injectable()
export class CommonEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          this.store.dispatch(initTasksStore());
          this.userService.logout();
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tryLogin),
      mergeMap((action) => {
        const user = this.userService.getUserFromLocalStorage();
        return of(loginUserSuccess({ user, redirect: false, path:'/' }));
      })
    );
  });
}
