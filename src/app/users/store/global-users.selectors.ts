import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ROLES } from "src/app/roles";
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
export const getToken = createSelector(getGlobalUsersState, state => {
    return state.user?.auth.token;
});
export const isAdmin = createSelector(getGlobalUsersState, state => {
    return state.user?.user.roles?.includes(ROLES.ROLE_ADMIN);
});
export const getUserId = createSelector(getGlobalUsersState, state => {
    return state.user?.user.id;
});
