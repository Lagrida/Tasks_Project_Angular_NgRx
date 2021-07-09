import { createFeatureSelector, createSelector } from '@ngrx/store';

import { tasksReducerFeatureKey, TasksState } from './tasks-reducer.reducer';

const getTasksState = createFeatureSelector<TasksState>(tasksReducerFeatureKey);

export const getSuccess = createSelector(getTasksState, state => {
    return state.success;
});

export const getSubmitLoading = createSelector(getTasksState, state => {
    return state.submitLoading;
});

export const getTasksErrorMessage = createSelector(getTasksState, state => {
    return state.errorMessage;
})

export const getTaskFilesStatus = createSelector(getTasksState, state => {
    return state.filesStatus;
})

export const getTotalTaskFilesStatus = createSelector(getTasksState, state => {
    return state.filesStatus.length;
})

export const getTaskFileStatusByFileName = (fileName: string) => createSelector(getTasksState, state => {
    return state.filesStatus.find(el => el.name === fileName);
})

export const getTasksLoading = createSelector(getTasksState, state => {
    return state.tasksLoading;
})

export const getTasksAreFullFeed = createSelector(getTasksState, state => {
    return state.tasksAreFullFeed;
})

export const getTasksInitial = createSelector(getTasksState, state => {
    return state.tasksList.filter(el => el.task.type === 0);
});
export const getTasksInProgress = createSelector(getTasksState, state => {
    return state.tasksList.filter(el => el.task.type === 1);
});
export const getTasksCompleted = createSelector(getTasksState, state => {
    return state.tasksList.filter(el => el.task.type === 2);
});

export const getSuccessErrorFilesUploadNumber = createSelector(getTasksState, state => {
    return state.filesUploadProgress.uploaded + state.filesUploadProgress.error;
});
