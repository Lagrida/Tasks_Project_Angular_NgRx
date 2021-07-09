import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { LoginType } from 'src/app/models/auth';
import { AppState } from 'src/app/reducers';
import { loginUser, setUsersErrorMessage, toggleSubmitLoading } from '../store/users-action.actions';
import { getSubmitLoading, getUsersErrorMessage } from '../store/users.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any;
  submitLoading: Observable<boolean> = EMPTY;
  errorMessage: Observable<string> = EMPTY;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.dispatch(setUsersErrorMessage({errorMessage : ""}));

    this.errorMessage = this.store.select(getUsersErrorMessage);
    this.submitLoading = this.store.select(getSubmitLoading);

    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  handleSubmit(event:any){
    this.store.dispatch(toggleSubmitLoading({submitLoading:true}));
    const user : LoginType = {
      username: this.form.value.username,
      password:this.form.value.password
    }
    this.store.dispatch(loginUser({ user }));
  }

}
