import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { AppState } from './reducers';
import { getErrorMessage } from './reducers/common.selectors';
import { UsersService } from './services/users.service';
import { loginUserSuccess } from './users/store/users-action.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project';
  errorMessage: Observable<string> = EMPTY;

  public constructor(private store: Store<AppState>, private userService: UsersService){}

  ngOnInit() {
    const user = this.userService.getUserFromLocalStorage();
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(loginUserSuccess({user, redirect:false}));
  }
}
