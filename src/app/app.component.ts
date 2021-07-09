import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { AppState } from './reducers';
import { setCommonErrorMessage } from './reducers/common.actions';
import { getCommonErrorMessage } from './reducers/common.selectors';
import { TasksService } from './services/tasks.service';
import { UsersService } from './services/users.service';
import { loginUserSuccess, tryLogin } from './users/store/users-action.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project';
  errorMessage: Observable<string> = EMPTY;

  public constructor(
    private store: Store<AppState>
  ){}

  ngOnInit() {
    this.errorMessage = this.store.select(getCommonErrorMessage);
    this.store.dispatch(tryLogin());
  }
  scrollTop(event: any) {
    window.scroll(0,0);
  }
  deleteErrorMessage(){
    this.store.dispatch(setCommonErrorMessage({ message: '' }));
  }
}
