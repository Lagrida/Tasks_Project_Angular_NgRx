import { Action, createReducer, on } from '@ngrx/store';
import { setCommonErrorMessage } from './common.actions';


export const commonFeatureKey = 'common';

export interface CommonState {
  errorMessage: string
}

export const initialState: CommonState = {
  errorMessage: ''
};


export const CommonReducer = createReducer(
  initialState,
  on(setCommonErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  })
);

