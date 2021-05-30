import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginUser, loginUserSuccess, registerUser, registerUserSuccessMessage, toggleRegistration } from './users-action.actions';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs';
import { errorMessageCommon } from '../../reducers/common.actions'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { UserAuth } from 'src/app/models/auth';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private store: Store<AppState>
  ) {}

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerUser),
      exhaustMap(action => {
        console.log("action user : " + action.user);
        return this.userService.addUser(action.user).pipe(
          map(
          (data:any) => {
            this.store.dispatch(toggleRegistration({registrationBegin:false}));
            return registerUserSuccessMessage({show:true});
          }),
          catchError((error:any) => {
            this.store.dispatch(toggleRegistration({registrationBegin:false}));
            return of(errorMessageCommon({ message: error?.message }));
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
            this.store.dispatch(toggleRegistration({registrationBegin:false}));
            this.store.dispatch(errorMessageCommon({ message: '' }));
            let userAuth: UserAuth = data;
            this.userService.setUserInLocalStorage(userAuth);
            return loginUserSuccess({ user: userAuth, redirect: true });
          }),
          catchError((error:any) => {
            this.store.dispatch(toggleRegistration({registrationBegin:false}));
            let message;
            if(error.error.message){
              message = error.error.message;
            }else{
              message = error?.message;
            }
            return of(errorMessageCommon({ message }));
          })
        );
      })
    );
  });
}
