import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginUser, loginUserSuccess, logout, registerUser, usersSuccessMessage, setUsersErrorMessage, toggleSubmitLoading, updateUser } from './users-action.actions';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs';
import { setCommonErrorMessage } from '../../reducers/common.actions'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { UserAuth } from 'src/app/models/auth';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerUser),
      exhaustMap(action => {
        return this.userService.addUser(action.user).pipe(
          map((data:any) => {
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            return usersSuccessMessage({show:true});
          }),
          catchError((error:any) => {
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            return of(setUsersErrorMessage({ errorMessage: error?.message }));
          })
        )
      })
    );
  });
  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      exhaustMap(action => {
        return this.userService.setUser(action.user, action.id).pipe(
          map(
          (data:any) => {
            console.log("data : ", data);
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            let userAuth: UserAuth = data;
            this.userService.logout();
            this.userService.setUserInLocalStorage(userAuth);
            return loginUserSuccess({ user: userAuth, redirect: true, path: '/users/profile' });
          }),
          catchError((error:any) => {
            console.log(error)
            let errorMessage;
            if(error?.error.errors){
              errorMessage = error.error?.error + ' : ' + error.error.errors[0]?.message;
            }
            else if(error?.error.error){
              errorMessage = error.error?.error + ' : ' + error.error?.message;
            }
            else{
              errorMessage = error?.message;
            }
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            return of(setUsersErrorMessage({ errorMessage }));
          })
        )
      })
    );
  });

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      exhaustMap((action) => {
        return this.userService.login(action.user).pipe(
          map((data: any) => {
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            this.store.dispatch(setUsersErrorMessage({ errorMessage: '' }));
            let userAuth: UserAuth = data;
            this.userService.setUserInLocalStorage(userAuth);
            return loginUserSuccess({ user: userAuth, redirect: true, path: '/' });
          }),
          catchError((error:any) => {
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            let errorMessage;
            if(error.error.message){
              errorMessage = error.error.message;
            }else{
              errorMessage = error?.message;
            }
            return of(setUsersErrorMessage({ errorMessage }));
          })
        );
      })
    );
  });

  /*logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          console.log('Inside the Logout');
          this.userService.logout();
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );*/

  redirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(...[loginUserSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate([action.path]);
          }
        })
      );
    },
    { dispatch: false }
  );
}
