import { createFeatureSelector, createSelector } from "@ngrx/store";
import { usersFeatureKey, UsersState } from "./users.reducer";

const getUsersState = createFeatureSelector<UsersState>(usersFeatureKey);

export const getSuccess = createSelector(getUsersState, state => {
    return state.success;
});

export const getSubmitLoading = createSelector(getUsersState, state => {
    return state.submitLoading;
});

export const getUsersErrorMessage = createSelector(getUsersState, state => {
    return state.errorMessage;
})
