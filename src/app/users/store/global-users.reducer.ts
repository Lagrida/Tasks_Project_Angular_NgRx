import { Action, createReducer, on } from '@ngrx/store';
import { UserAuth } from 'src/app/models/auth';
import { User } from 'src/app/models/user';
import { loginUserSuccess } from './users-action.actions';


export const globalUsersFeatureKey = 'globalUsers';

export interface GlobalUsersState {
  usersList: User[],
  user: UserAuth | null
}

export const initialState: GlobalUsersState = {
  usersList: [],
  user: null
};


export const GlobalUsersreducer = createReducer(
  initialState,
  on(loginUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  })
);

