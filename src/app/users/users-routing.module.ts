import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './list/users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'list',
          component: UsersComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        },
        {
          path: 'profile/edit',
          component: EditProfileComponent
        }
      ]
  }
];
@NgModule({
    imports: [RouterModule.forChild(routes)]
  })
export class UsersRoutingModule { }
