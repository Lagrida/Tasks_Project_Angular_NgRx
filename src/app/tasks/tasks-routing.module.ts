import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BodyComponent } from "./body/body.component";


const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: '',
          component: BodyComponent
        }
      ]
  }
];
@NgModule({
    imports: [RouterModule.forChild(routes)]
  })
export class TasksRoutingModule { }
