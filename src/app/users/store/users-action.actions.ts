import { createAction, props } from '@ngrx/store';
import { LoginType, UserAuth } from 'src/app/models/auth';
import { User } from 'src/app/models/user';

//-------------------------------------------- Register --------------------------------------------------
export const REGISTER_USER = "[UsersAction] register new user";
export const UPDATE_USER = "[UsersAction] update a user";
export const USER_SUCCESS = "[UsersAction] user success";
export const UPDATE_USER_SUCCESS = "[UsersAction] user updated successfuly";
export const TOGLE_SUBMIT_LOADING = "[UsersAction] toggle submit Loading";
export const SET_MESSAGE_ERROR = "[UsersAction] set the error message";

export const registerUser = createAction(REGISTER_USER, props<{ user: User }>());
export const updateUser = createAction(UPDATE_USER, props<{ user: User, id:number }>());
export const usersSuccessMessage = createAction(USER_SUCCESS, props<{ show: boolean }>());
export const toggleSubmitLoading = createAction(TOGLE_SUBMIT_LOADING, props<{ submitLoading: boolean }>());
export const setUsersErrorMessage = createAction(SET_MESSAGE_ERROR, props<{ errorMessage: string }>());

//------------------------------------------------- Login -------------------------------------------------
export const LOGIN_USER = "[UsersAction] Login user";
export const LOGIN_USER_SUCCESS = "[UsersAction] Login user success";
export const LOGIN_USER_FAIL = "[UsersAction] Login user failed";
export const LOGIN_FIRST = "[UsersAction] Try Login at First visit";
export const LOGOUT = "[UsersAction] Logout";

export const loginUser = createAction(
    LOGIN_USER,
    props<{user: LoginType}>()
);
export const loginUserSuccess = createAction(
    LOGIN_USER_SUCCESS,
    props<{ user: UserAuth | null, redirect: boolean, path: string }>()
);
export const tryLogin = createAction(
  LOGIN_FIRST
);
export const logout = createAction(LOGOUT);
