import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from ".";
import { CommonState } from "./common.reducer";


const getCommonState = createFeatureSelector<CommonState>('commonState');


export const getErrorMessage = createSelector(getCommonState, state => {
    //console.log('error Message : ' + state.commonState.errorMessage)
  return state.errorMessage;
});
