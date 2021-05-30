import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { GlobalUsersState, GlobalUsersreducer, globalUsersFeatureKey } from '../users/store/global-users.reducer';
import { CommonState } from './common.reducer';
import { CommonReducer } from './common.reducer';


export interface AppState {
  commonState: CommonState;
  [globalUsersFeatureKey]: GlobalUsersState
}

export const reducers: ActionReducerMap<AppState> = {
  commonState: CommonReducer,
  [globalUsersFeatureKey]: GlobalUsersreducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
