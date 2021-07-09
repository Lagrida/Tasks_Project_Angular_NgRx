import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { loginUserSuccess, registerUser, usersSuccessMessage, setUsersErrorMessage, toggleSubmitLoading } from './users-action.actions';


export const usersFeatureKey = 'users';

export interface UsersState {
  success: boolean,
  submitLoading: boolean,
  errorMessage: string
}

export const initialState: UsersState = {
  success: false,
  submitLoading: false,
  errorMessage: ''
};

export const usersReducer = createReducer(
  initialState,
  on(usersSuccessMessage, (state, action) => {
    return {
      ...state,
      success: action.show
    }
  }),
  on(toggleSubmitLoading, (state, action) => {
    return {
      ...state,
      submitLoading: action.submitLoading
    }
  }),
  on(setUsersErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage
    }
  })
);

