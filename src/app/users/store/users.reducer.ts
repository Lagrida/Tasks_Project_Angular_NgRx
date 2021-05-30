import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { loginUserSuccess, registerUser, registerUserSuccessMessage, toggleRegistration } from './users-action.actions';


export const usersFeatureKey = 'users';

export interface UsersState {
  isRegistred: boolean,
  registrationBegin: boolean
}

export const initialState: UsersState = {
  isRegistred: false,
  registrationBegin: false
};

export const usersReducer = createReducer(
  initialState,
  on(registerUserSuccessMessage, (state, action) => {
    console.log('Register is Success')
    return {
      ...state,
      isRegistred: true
    }
  }),
  on(toggleRegistration, (state, action) => {
    return {
      ...state,
      registrationBegin: action.registrationBegin
    }
  })
);

