import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppState } from '../../reducers';
import { registerUser, usersSuccessMessage, setUsersErrorMessage, toggleSubmitLoading } from '../store/users-action.actions';
import { UsersState } from '../store/users.reducer';
import { getSuccess, getSubmitLoading, getUsersErrorMessage } from '../store/users.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: any;
  isRegistred: Observable<boolean> = EMPTY;
  submitLoading: Observable<boolean> = EMPTY;
  errorMessage: Observable<string> = EMPTY;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(setUsersErrorMessage({errorMessage : ""}));
    this.store.dispatch(usersSuccessMessage({show : false}));
    
    this.isRegistred = this.store.select(getSuccess);
    this.submitLoading = this.store.select(getSubmitLoading);
    this.errorMessage = this.store.select(getUsersErrorMessage);

    this.form = this.formBuilder.group({
      username: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^[\w-\s]+$/),
          this.minMaxValidator
        ]
      }],
      passwordZone: this.formBuilder.group({
        password: ['', {
			validators: [
				Validators.minLength(6)
			]
		}],
        repeatedPassword: ['']
      }, {
        validators: [this.checkPasswords]
      } as AbstractControlOptions),
      email: ['', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }],
      name: [''],
      image: [''],
      birthday: [new Date('04/04/1993')],
      gender: ['MALE']
    }, {
      updateOn: 'submit'
    });
  }
  
  ngOnDestroy(){}

  minMaxValidator(control: FormControl){
    const actualLength = control.value.trim().length;
    const minLength = 6;
    const maxLength = 20;
    if(actualLength > maxLength || actualLength < minLength){
      return {
        minMaxError: true,
        minLength,
        maxLength,
        actualLength
      }
    }
    return null;
  }
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const repeatedPassword = group?.get('repeatedPassword')?.value;
    if(password != repeatedPassword){
      return { passwordsNotMatche: true }
    }
    return null;
  }
  handleSubmit(event:any){
    const values = this.form.value;
    const birthday = values.birthday.toLocaleDateString() + ' 01:00';
    this.store.dispatch(toggleSubmitLoading({ submitLoading:true }));
    const user: User = new User(values.username, values.email, values.image, values.name, birthday, values.gender, values.passwordZone.password);
    this.store.dispatch(registerUser({user}));
  }
}
