import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { TasksState } from './tasks-reducer.reducer';
import { tasksReducer } from './tasks-reducer.reducer';
import { environment } from '../../../environments/environment';

export const tasksStateFeatureKey = 'tasksState';

export interface tasksAppState {
  [tasksStateFeatureKey]: TasksState
}

export const tasksReducers: ActionReducerMap<tasksAppState> = {
  [tasksStateFeatureKey]: tasksReducer
};


export const metaReducers: MetaReducer<tasksAppState>[] = !environment.production ? [] : [];
