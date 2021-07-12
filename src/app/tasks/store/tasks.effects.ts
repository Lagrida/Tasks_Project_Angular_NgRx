import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { FileObs, FilesService } from 'src/app/services/files.service';
import { TasksService } from 'src/app/services/tasks.service';
import { addNewTask, uploadEnded, emptyAction, incrementFileErrorUpload, incrementFileSuccessUpload, loadTasks, loadTasksSuccess, setTasksErrorMessage, toggleSubmitLoading, toggleTasksAreFullFeed, toggleTasksLoading, toggleTasksSuccess, updateTasksFileStatus, updateTasksFileStatusProperty, uploadTaskFiles, updateTask, deleteTask, updateTaskType, addTaskSignature, TaskSignatureAdded } from './tasks.actions';
import { merge as mergeStatic } from 'rxjs/internal/observable/merge';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { getSuccessErrorFilesUploadNumber, getTotalTaskFilesStatus } from './tasks.selectors';
import { setCommonErrorMessage } from 'src/app/reducers/common.actions';

@Injectable()
export class TasksEffects {

  uploadFiles$: Subscription;

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private filesService: FilesService,
    private store: Store<AppState>) {}

  addNewTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addNewTask),
      exhaustMap(action => {
        return this.tasksService.addTask(action.task).pipe(
          map((data:any) => {
            console.log('Adding Task')
            this.store.dispatch(setTasksErrorMessage({ errorMessage: '' }));
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            this.store.dispatch(toggleTasksSuccess({ success:true }));
            if(action.files.length > 0){
              return uploadTaskFiles({files: action.files, taskId: data.id});
            }else{
              this.store.dispatch(uploadEnded());
              return loadTasks();
            }
          }),
          catchError((error:any) => {
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            return of(setTasksErrorMessage({ errorMessage: error?.message }));
          })
        )
      })
    )
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      exhaustMap(action => {
        return this.tasksService.updateTask(action.task, action.taskId).pipe(
          map((data:any) => {
            this.store.dispatch(setTasksErrorMessage({ errorMessage: '' }));
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            this.store.dispatch(toggleTasksSuccess({ success:true }));
            if(action.files.length > 0){
              return uploadTaskFiles({files: action.files, taskId: data.id});
            }else{
              this.store.dispatch(uploadEnded());
              return loadTasks();
            }
          }),
          catchError((error:any) => {
            this.store.dispatch(toggleSubmitLoading({submitLoading:false}));
            return of(setTasksErrorMessage({ errorMessage: error?.message }));
          })
        )
      })
    )
  });
  updateTaskType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTaskType),
      exhaustMap(action => {
        return this.tasksService.updateTaskType(action.taskId, action.taskType).pipe(
          map((data:any) => {
            this.store.dispatch(setCommonErrorMessage({ message: '' }));
            this.store.dispatch(toggleTasksLoading({ loading: true }));

            return loadTasks();
          }),
          catchError((error:any) => {
            return of(setCommonErrorMessage({ message: error?.message }));
          })
        )
      })
    )
  });
  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      exhaustMap(action => {
        return this.tasksService.deleteTask(action.taskId).pipe(
          map((data:any) => {
            this.store.dispatch(setTasksErrorMessage({ errorMessage: '' }));
            return loadTasks();
          }),
          catchError((error:any) => {
            return of(setTasksErrorMessage({ errorMessage: error?.message }));
          })
        )
      })
    )
  });

  uploadTasksFiles$ = createEffect(() => { //uploadTaskFiles
    return this.actions$.pipe(
    ofType(uploadTaskFiles),
    map(action => {
      let observers: Observable<any>[] = [];
      action.files.forEach((file: File) => {
        observers.push(this.filesService.uploadTaskFile(file, action.taskId).pipe(catchError((error:any) => {
          this.store.dispatch(updateTasksFileStatusProperty({fileName: file.name, property: "class", value: "error-upload"}));
          this.store.dispatch(updateTasksFileStatusProperty({fileName: file.name, property: "percent", value: 0}));
          return of(incrementFileErrorUpload());
        })));
      });
      this.uploadFiles$ = mergeStatic(...observers).subscribe(
        (fileObs: FileObs) => {
          console.log('in subscription');
          if(fileObs.event.type == HttpEventType.UploadProgress){
			  console.log
            const percent = Math.round(100 * fileObs.event.loaded / (fileObs.event.total || 1));
            this.store.dispatch(updateTasksFileStatusProperty({fileName: fileObs.fileName, property: "percent", value: percent}));
          }
          else if(fileObs.event.type == HttpEventType.Response){
            this.store.dispatch(incrementFileSuccessUpload());
            this.store.dispatch(updateTasksFileStatusProperty({fileName: fileObs.fileName, property: "class", value: "done"}));
          }
        }
      )
    }))},
    { dispatch: false }
    );
  checkUploadEnd$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(incrementFileSuccessUpload, incrementFileErrorUpload),
      withLatestFrom(this.store.select(getSuccessErrorFilesUploadNumber), this.store.select(getTotalTaskFilesStatus)),
      map(([actions, filesSuccessErrorUploaded, totalTaskFilesStatus]) => {
        const totalFilesCheked:number = filesSuccessErrorUploaded;
        const totalTaskFiles: number = totalTaskFilesStatus;
        if(totalFilesCheked === totalTaskFiles){
          this.uploadFiles$.unsubscribe();
          this.store.dispatch(uploadEnded());
          return loadTasks();
        }
        return emptyAction();
      })
    );
  });
  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      exhaustMap(action => {
        return this.tasksService.getTasks().pipe(
          map((tasks:any) => {
            this.store.dispatch(toggleTasksLoading({ loading: false }));
            this.store.dispatch(setCommonErrorMessage({ message: '' }));
            this.store.dispatch(toggleTasksAreFullFeed({ tasksAreFullFeed: true }));
            return loadTasksSuccess({ tasks });
          }),
          catchError((error:any) => {
            this.store.dispatch(toggleTasksLoading({ loading: false }));
            this.store.dispatch(toggleTasksAreFullFeed({ tasksAreFullFeed: false }));
            return of(setCommonErrorMessage({ message: error?.message }));
          })
        )
      })
    )
  });
  addTaskSignature$ = createEffect(() => { //uploadTaskFiles
    return this.actions$.pipe(
    ofType(addTaskSignature),
    exhaustMap(action => {
      return this.filesService.uploadTaskSignatureFile(action.file, action.taskId).pipe(
        map((event: HttpEvent<any>) => {
          if(event.type == HttpEventType.UploadProgress){
            const percent = Math.round(100 * event.loaded / (event.total || 1));
            return updateTasksFileStatusProperty({fileName: "filename.png", property: "percent", value: percent});
          }
          else if(event.type == HttpEventType.Response){
            this.store.dispatch(setTasksErrorMessage({ errorMessage: '' }));
            this.store.dispatch(TaskSignatureAdded());
            return loadTasks();
          }
          return emptyAction();
        }),
        catchError((error:any) => {
          this.store.dispatch(toggleSubmitLoading({submitLoading: false}));
          return of(setTasksErrorMessage({ errorMessage: error?.message }));
        })
      )
    })
    );
  });
}
