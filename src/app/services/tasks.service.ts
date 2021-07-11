import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tasksService } from '../backend';
import { FullTask } from '../models/full-task';
import { Task } from '../models/task';
import { TaskRequest } from '../models/task-request';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient){}

  addTask(task: Task): Observable<Task>{
    const url = tasksService + 'add_task';
    return this.http.post<Task>(url, task);
  }
  updateTask(task: Task, taskId: number): Observable<Task>{
    const url = tasksService + 'update_task/' + taskId;
    return this.http.patch<Task>(url, task);
  }
  deleteTask(taskId: number): Observable<any>{
    const url = tasksService + 'delete_task/' + taskId;
    return this.http.delete<any>(url);
  }
  getTasks(): Observable<FullTask[]>{
    const url = tasksService + 'get_full_tasks';
    return this.http.get<FullTask[]>(url);
  }
  updateTaskType(taskId: number, type: number): Observable<Task>{
    const url = tasksService + 'change_task_type/' + taskId + '/' + type;
    return this.http.patch<Task>(url, {});
  }
}
