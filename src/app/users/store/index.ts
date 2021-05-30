import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { UsersState } from './users.reducer';
  import { usersReducer } from './users.reducer';
  
  
  export interface usersAppState {
    usersState: UsersState;
  }
  
  export const usersReducers: ActionReducerMap<usersAppState> = {
    usersState: usersReducer
  };
