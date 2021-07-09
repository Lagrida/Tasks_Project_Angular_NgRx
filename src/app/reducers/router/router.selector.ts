
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateInterface } from './router-state';

export const routerFeatureKey = 'router';
export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateInterface>>(routerFeatureKey);
export const getCurrentRoute = createSelector(getRouterState, (router) => {
  return router.state;
});
