import { createAction, props } from '@ngrx/store';
import { LoginType, UserAuth } from 'src/app/models/auth';
import { User } from 'src/app/models/user';


// -------------------------------------------- Register --------------------------------------------------
export const REGISTER_USER = "[UsersAction] register new user";
export const REGISTER_USER_SUCCESS = "[UsersAction] user registred successfuly";
export const TOGLE_REGISTER_BEGIN_END = "[UsersAction] toggle register begin end";

export const registerUser = createAction(REGISTER_USER, props<{ user: User }>());
export const registerUserSuccessMessage = createAction(REGISTER_USER_SUCCESS, props<{ show: boolean }>());
export const toggleRegistration = createAction(TOGLE_REGISTER_BEGIN_END, props<{ registrationBegin: boolean }>());

// ------------------------------------------------- Login -------------------------------------------------
export const LOGIN_USER = "[UsersAction] Login user";
export const LOGIN_USER_SUCCESS = "[UsersAction] Login user success";
export const LOGIN_USER_FAIL = "[UsersAction] Login user failed";
export const LOGIN_FIRST = "[UsersAction] Try Login at First visit";

export const loginUser = createAction(
    LOGIN_USER,
    props<{user: LoginType}>()
  );
export const loginUserSuccess = createAction(
    REGISTER_USER_SUCCESS,
    props<{ user: UserAuth | null; redirect: boolean }>()
);
export const tryLogin = createAction(
  LOGIN_FIRST
);
