import { Action, createReducer, on } from '@ngrx/store';
import { errorMessageCommon } from './common.actions';


export const commonFeatureKey = 'common';

export interface CommonState {
  errorMessage: string
}

export const initialState: CommonState = {
  errorMessage: ''
};


export const CommonReducer = createReducer(
  initialState,
  on(errorMessageCommon, (state, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  })
);

