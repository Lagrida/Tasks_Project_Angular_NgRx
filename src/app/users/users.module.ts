import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from './list/users.component';
//import { routes } from './users-routing.module';

import {DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {DemoMaterialModule} from '../material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SideImgComponent } from "./side-img/side-img.component";
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';
import { StoreModule } from '@ngrx/store';
import { usersFeatureKey, usersReducer } from "./store/users.reducer";
//import { usersReducers } from "./store";
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    declarations: [
        EditProfileComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        UsersComponent,
        SideImgComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        UsersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        DemoMaterialModule,
        PerfectScrollbarModule,
        StoreModule.forFeature(usersFeatureKey, usersReducer),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forFeature([UsersEffects])
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

    ]
})
export class UsersModule { }
