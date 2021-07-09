import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//import { routes } from './users-routing.module';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

import {DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {DemoMaterialModule} from '../material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TasksRoutingModule } from "./tasks-routing.module";
import { BodyComponent } from './body/body.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FilesDragDropDirective } from "../directives/files-drag-drop.directive";
import { tasksStateFeatureKey, tasksReducers } from './store';
import { tasksReducer, tasksReducerFeatureKey } from "./store/tasks-reducer.reducer";
import { TasksEffects } from './store/tasks.effects';
import { OverlayComponent } from "../overlay/overlay.component";
import { DisplayTaskComponent } from './display-task/display-task.component';
import { FocusInvalidFieldsDirective } from "../directives/focus-invalid-fields.directive";
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskFormComponent } from './task-form/task-form.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    declarations: [
    BodyComponent,
    AddTaskComponent,
    FilesDragDropDirective,
    FocusInvalidFieldsDirective,
    OverlayComponent,
    DisplayTaskComponent,
    UpdateTaskComponent,
    TaskFormComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        TasksRoutingModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        DemoMaterialModule,
        PerfectScrollbarModule,
        StoreModule.forFeature(tasksReducerFeatureKey, tasksReducer),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forFeature([TasksEffects]),
        
    ],
    providers: [
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { appearance: 'fill' }
      },
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
      {
        provide: MatDialogRef,
        useValue: {}
      }
    ]
})
export class TasksModule { }
