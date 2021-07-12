import { Action, createReducer, on } from '@ngrx/store';
import { FileStatus } from 'src/app/models/file-status';
import { FullTask } from 'src/app/models/full-task';
import { addTasksFileStatus, uploadEnded, deleteTasksFileStatus, incrementFileErrorUpload, incrementFileSuccessUpload, initUploadEnded, initFilesStatus, initTasksFileStatus, initUploadObject, loadTasksSuccess, setTasksErrorMessage, toggleSubmitLoading, toggleTasksAreFullFeed, toggleTasksLoading, toggleTasksSuccess, updateTasksFileStatus, updateTasksFileStatusProperty, initTasksStore } from './tasks.actions';


export const tasksReducerFeatureKey = 'tasks';

export interface TasksState {
  success: boolean,
  submitLoading: boolean,
  errorMessage: string,
  tasksLoading: boolean,
  tasksAreFullFeed: boolean,
  tasksList: FullTask[],
  filesStatus: FileStatus[],
  filesUploadProgress:{
    uploaded: number,
    error: number
  },
  uploadEnd: boolean
}
export const initialState: TasksState = {
  success: false,
  submitLoading: false,
  errorMessage: '',
  tasksLoading: true,
  tasksAreFullFeed: false,
  tasksList: [],
  filesStatus: [],
  filesUploadProgress:{
    uploaded: 0,
    error: 0
  },
  uploadEnd: false
};
export const tasksReducer = createReducer(
  initialState,
  on(initTasksStore, (state, action) => {
    return initialState;
  }),
  on(toggleTasksSuccess, (state, action) => {
    return {
      ...state,
      success: action.success
    }
  }),
  on(toggleSubmitLoading, (state, action) => {
    return {
      ...state,
      submitLoading: action.submitLoading
    }
  }),
  on(setTasksErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage
    }
  }),
  on(initFilesStatus, (state, action) => {
    return {
      ...state,
      filesStatus: []
    }
  }),
  on(addTasksFileStatus, (state, action) => {
    let filesStatus = [...state.filesStatus];
    filesStatus.push(action.fileStatus);
    return {
      ...state,
      filesStatus
    }
  }),
  on(deleteTasksFileStatus, (state, action) => {
    let filesStatus = [...state.filesStatus];
    filesStatus = filesStatus.filter(fileStatus => fileStatus.name !== action.fileName);
    return {
      ...state,
      filesStatus
    }
  }),
  on(initTasksFileStatus, (state, action) => {
    return {
      ...state,
      filesStatus: []
    }
  }),
  on(updateTasksFileStatus, (state, action) => {
    let filesStatus = [...state.filesStatus];
    let fileIndex: number = filesStatus.findIndex(el => el.name === action.fileStatus.name);
    filesStatus[fileIndex] = action.fileStatus;
    return {
      ...state,
      filesStatus
    }
  }),
  on(updateTasksFileStatusProperty, (state, action) => {
    let filesStatus = [...state.filesStatus];
    const getFileIndex = filesStatus.findIndex(el => el.name === action.fileName);
    if(getFileIndex !== -1){
      const getFile = filesStatus[getFileIndex];
      let file: FileStatus = {...getFile}
      if(action.property in file){
        file[action.property as keyof FileStatus] = action.value;
      }
      filesStatus[getFileIndex] = file;
      return {
        ...state,
        filesStatus
      }
    }
    return state;
  }),
  on(initUploadObject, (state, action) => {
    const filesUploadProgress = {
      uploaded: 0,
      error: 0
    }
    return {
      ...state,
      filesUploadProgress
    }
  }),
  on(incrementFileSuccessUpload, (state, action) => {
    let filesUploadProgress = {...state.filesUploadProgress};
    filesUploadProgress.uploaded += 1;
    return {
      ...state,
      filesUploadProgress
    }
  }),
  on(incrementFileErrorUpload, (state, action) => {
    console.log('i am here in reducer')
    let filesUploadProgress = {...state.filesUploadProgress};
    filesUploadProgress.error += 1;
    return {
      ...state,
      filesUploadProgress
    }
  }),
  on(initUploadEnded, (state, action) => {
    return {
      ...state,
      uploadEnd: false
    }
  }),
  on(uploadEnded, (state, action) => {
    let uploadEnd = false;
    const uploadedFiles = state.filesUploadProgress.error + state.filesUploadProgress.uploaded;
    if(uploadedFiles === state.filesStatus.length){
      uploadEnd = true;
    }
    return {
      ...state,
      uploadEnd
    }
  }),
  on(toggleTasksLoading, (state, action) => {
    return {
      ...state,
      tasksLoading: action.loading
    }
  }),
  on(loadTasksSuccess, (state, action) => {
    return {
      ...state,
      tasksList: action.tasks
    }
  }),
  on(toggleTasksAreFullFeed, (state, action) => {
    return {
      ...state,
      tasksAreFullFeed: action.tasksAreFullFeed
    }
  })
);

