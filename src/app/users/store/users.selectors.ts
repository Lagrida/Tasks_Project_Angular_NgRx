import { createFeatureSelector, createSelector } from "@ngrx/store";
import { usersFeatureKey, UsersState } from "./users.reducer";

const getUsersState = createFeatureSelector<UsersState>(usersFeatureKey);

export const getIsRegistred = createSelector(getUsersState, state => {
    return state.isRegistred;
});

export const getRegistrationBegin = createSelector(getUsersState, state => {
    return state.registrationBegin;
});

export const getIfIsConnected = createSelector(getUsersState, state => {
    return state.registrationBegin;
});
