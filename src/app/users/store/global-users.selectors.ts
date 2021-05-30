import { createFeatureSelector, createSelector } from "@ngrx/store";
import { globalUsersFeatureKey, GlobalUsersState } from "./global-users.reducer";



const getGlobalUsersState = createFeatureSelector<GlobalUsersState>(globalUsersFeatureKey);

export const getIsConnected = createSelector(getGlobalUsersState, state => {
    return state.user !== null;
});

export const getUser = createSelector(getGlobalUsersState, state => {
    if(state.user !== null){
        return state.user.user;
    }
    return null;
});
