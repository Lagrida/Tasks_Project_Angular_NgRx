import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppFile, FullTask, TaskUser } from 'src/app/models/full-task';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, OnDestroy {

  fullTask: FullTask;

  constructor(){}

  ngOnInit(): void {
    
    const task: Task = new Task('', '', []);
    const users: TaskUser[] = [];
    const files: AppFile[] = [];

    this.fullTask = {
      task,
      users,
      files
    }
  }
  ngOnDestroy(): void{}
}
