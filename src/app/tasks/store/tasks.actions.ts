import { createAction, props } from '@ngrx/store';
import { FileStatus } from 'src/app/models/file-status';
import { FullTask } from 'src/app/models/full-task';
import { Task } from 'src/app/models/task';
import { TaskRequest } from 'src/app/models/task-request';

//------------------------------------------- Task -----------------------------------------------
export const EMPTY_ACTION = '[Tasks] Empty action';
export const ADD_NEW_TASK = '[Tasks] Add new task';
export const TOGLE_SUBMIT_LOADING = '[Tasks] toggle submit Loading';
export const TASK_SUCCESS = "[Tasks] task success";
export const SET_MESSAGE_ERROR = '[Tasks] set the error message';

export const FIND_TASK_FILE_STATUS = '[Tasks] find Task File status';
export const INIT_FILES_STATUS = '[Tasks] init files status';
export const ADD_TASK_FILE_STATUS = '[Tasks] add Task File status';
export const DELETE_TASK_FILE_STATUS = '[Tasks] delete Task File status';
export const UPDATE_TASK_FILE_STATUS = '[Tasks] update Task File status';
export const UPDATE_TASK_FILE_STATUS_PROPERTY = '[Tasks] update Task File status property';
export const INIT_TASK_FILE_STATUS = '[Tasks] init Task File status';
export const UPLOAD_TASK_FILES = '[Tasks] upload Task Files';

export const INIT_UPLOAD_OBJECT = '[Tasks] init upload files';
export const INCREMENT_FILE_SUCCESS_UPLOAD = '[Tasks] incriment file success upload';
export const INCREMENT_FILE_ERROR_UPLOAD = '[Tasks] incriment file error upload';
export const CHECK_UPLOAD_END = '[Tasks] check upload end';
export const INIT_CHECK_UPLOAD_END = '[Tasks] init check upload end';

export const LOAD_TASKS = '[Tasks] Load tasks';
export const LOAD_TASKS_SUCCESS = '[Tasks] Load tasks success';
export const TOGLE_TASKS_LOADING = '[Tasks] Toggle tasks loading';
export const TOGGLE_TASKS_ARE_FULL_FEED = '[Tasks] Toggle Tasks are full feed';

export const UPDATE_TASK = '[Tasks] Update Task';
export const DELETE_TASK = '[Tasks] Delete Task';

export const INIT_TASKS_STORE = '[Tasks] Init tasks store';

export const emptyAction = createAction(EMPTY_ACTION);
//export const addNewTask = createAction(ADD_NEW_TASK, props<{ taskRequest: TaskRequest }>());
export const addNewTask = createAction(ADD_NEW_TASK, props<{ task: Task, files: File[] }>());
export const toggleSubmitLoading = createAction(TOGLE_SUBMIT_LOADING, props<{ submitLoading: boolean }>());
export const setTasksErrorMessage = createAction(SET_MESSAGE_ERROR, props<{ errorMessage: string }>());
export const toggleTasksSuccess = createAction(TASK_SUCCESS, props<{ success: boolean }>());
export const initFilesStatus = createAction(INIT_FILES_STATUS);
export const addTasksFileStatus = createAction(ADD_TASK_FILE_STATUS, props<{ fileStatus: FileStatus }>());
export const deleteTasksFileStatus = createAction(DELETE_TASK_FILE_STATUS, props<{ fileName: string }>());
export const updateTasksFileStatus = createAction(UPDATE_TASK_FILE_STATUS, props<{ fileStatus: FileStatus }>());
export const updateTasksFileStatusProperty = createAction(UPDATE_TASK_FILE_STATUS_PROPERTY, props<{ fileName: string, property: string, value: any }>());
export const initTasksFileStatus = createAction(INIT_TASK_FILE_STATUS);
export const uploadTaskFiles = createAction(UPLOAD_TASK_FILES, props<{ files: File[], taskId: number }>());

export const updateTask = createAction(UPDATE_TASK, props<{ task: Task, taskId: number, files: File[] }>());
export const deleteTask = createAction(DELETE_TASK, props<{ taskId: number }>());

export const initUploadObject = createAction(INIT_UPLOAD_OBJECT);
export const incrementFileSuccessUpload = createAction(INCREMENT_FILE_SUCCESS_UPLOAD);
export const incrementFileErrorUpload = createAction(INCREMENT_FILE_ERROR_UPLOAD);
export const uploadEnded = createAction(CHECK_UPLOAD_END);
export const initUploadEnded = createAction(INIT_CHECK_UPLOAD_END);

export const loadTasks = createAction(LOAD_TASKS);
export const loadTasksSuccess = createAction(LOAD_TASKS_SUCCESS, props<{ tasks: FullTask[] }>());
export const toggleTasksLoading = createAction(TOGLE_TASKS_LOADING, props<{ loading: boolean }>());
export const toggleTasksAreFullFeed = createAction(TOGGLE_TASKS_ARE_FULL_FEED, props<{ tasksAreFullFeed: boolean }>());

export const initTasksStore = createAction(INIT_TASKS_STORE);
