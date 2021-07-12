import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { deleteTask, loadTasks, TaskSignatureAdded, toggleTasksLoading, updateTask, updateTaskType, uploadEnded } from '../store/tasks.actions';
import { EMPTY, fromEvent, Observable, Subscription } from 'rxjs';
import { getTasksInitial, getTasksAreFullFeed, getTasksLoading, getTasksInProgress, getTasksCompleted } from '../store/tasks.selectors';
import { FullTask, AppFile, TaskUser } from 'src/app/models/full-task';
import { DisplayTaskComponent } from '../display-task/display-task.component';
import { Actions, ofType } from '@ngrx/effects';
import { delay, map, take } from 'rxjs/operators';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { getUserId, isAdmin } from 'src/app/users/store/global-users.selectors';
import { getCommonErrorMessage } from 'src/app/reducers/common.selectors';
import { setCommonErrorMessage } from 'src/app/reducers/common.actions';
import { Task } from 'src/app/models/task';
import { DisplaySignatureComponent } from '../display-signature/display-signature.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {

  tasksLoading: Observable<boolean>;
  getTasksAreFullFeed: Observable<boolean>;
  getTasksInitial: Observable<FullTask[]>;
  getTasksInProgress: Observable<FullTask[]>;
  getTasksCompleted: Observable<FullTask[]>;
  isAdmin: Observable<boolean | undefined>;
  getCommonErrorMessage: Observable<string>;
  getUserId: Observable<number | undefined>;

  private readonly subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private readonly actions$: Actions
    ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.store.dispatch(setCommonErrorMessage({ message: '' }));

    this.tasksLoading = this.store.select(getTasksLoading);
    this.getTasksAreFullFeed = this.store.select(getTasksAreFullFeed);
    this.getTasksInitial = this.store.select(getTasksInitial);
    this.getTasksInProgress = this.store.select(getTasksInProgress);
    this.getTasksCompleted = this.store.select(getTasksCompleted);
    this.isAdmin = this.store.select(isAdmin);
    this.getUserId = this.store.select(getUserId);

    this.getCommonErrorMessage = this.store.select(getCommonErrorMessage);
    this.store.dispatch(toggleTasksLoading({ loading: true }));
    this.store.dispatch(loadTasks());
    this.subscription.add(
      this.actions$.pipe(
        ofType(uploadEnded),
        delay(1500)
      ).subscribe(val => {
        this.dialog.closeAll();
      })
    );
    this.subscription.add(
      this.actions$.pipe(
        ofType(TaskSignatureAdded),
        delay(800)
      ).subscribe(val => {
		
        this.dialog.closeAll();
      })
    );
  }
  openDialog(): void {
    this.dialog.open(AddTaskComponent, {
      width: '700px',
      data: {}
    });
  }
  displayTask(fullTask: FullTask): void {
    this.dialog.open(DisplayTaskComponent, {
      width: '700px',
      data: {
        fullTask
      }
    });
  }
  updateTask(fullTask: FullTask): void {
    console.log('inside updating')
    this.dialog.open(UpdateTaskComponent, {
      width: '700px',
      data: {
        fullTask
      }
    });
  }
  drop(event: CdkDragDrop<any>) {
    console.log('Drop');
    const taskTypes = ['initial', 'in_progress', 'completed'];
    //if(event != null){
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
      else{
        const taskType = event.container.element.nativeElement.getAttribute("name");
        const taskDropped: FullTask = event.previousContainer.data[event.previousIndex];
        if(taskType === taskTypes[2]){ // completed
          // Open Signature
          this.dialog.open(DisplaySignatureComponent, {
            width: '700px',
            data: {
              taskId: taskDropped.task.id
            }
          });
        }else{
          // initial --> in_progress or in_progress --> initial
          const getTypeNumber = taskTypes.findIndex(el => el === taskType);
          // send To server
          if(taskDropped.task.id != undefined){
            this.store.dispatch(updateTaskType({ taskId: taskDropped.task.id, taskType: getTypeNumber }));
          }
        }
        if(taskType !== taskTypes[2]){
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
      }
    }
    deleteTask(taskId: number | undefined): void{
      if(window.confirm('Are you sure to delete task ?') && taskId != undefined){
        this.store.dispatch(deleteTask({ taskId }));
      }
    }
}
