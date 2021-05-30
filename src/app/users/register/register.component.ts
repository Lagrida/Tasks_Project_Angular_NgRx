import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppState } from '../../reducers';
import { registerUser, toggleRegistration } from '../store/users-action.actions';
import { UsersState } from '../store/users.reducer';
import { getIsRegistred, getRegistrationBegin } from '../store/users.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: any;
  isRegistred: Observable<boolean> = EMPTY;
  registrationBegin: Observable<boolean> = EMPTY;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isRegistred = this.store.select(getIsRegistred);
    this.registrationBegin = this.store.select(getRegistrationBegin);

    this.form = this.formBuilder.group({
      username: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^[\w-\s]+$/),
          this.minMaxValidator
        ]
      }],
      passwordZone: this.formBuilder.group({
        password: [''],
        repeatedPassword: ['']
      }, {
        validators: [this.checkPasswords],
        updateOn: 'change'
      }),
      email: ['', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }],
      name: [''],
      image: [''],
      birthday: [''],
      gender: ['']
    }, {
      updateOn: 'submit'
    });
  }
  ngOnDestroy(){

  }
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
    //console.log("BirthDay : " + );
    const birthday = values.birthday.toLocaleDateString() + ' 01:00';
    this.store.dispatch(toggleRegistration({registrationBegin:true}));
    const user: User = new User(values.username, values.email, values.image, values.name, birthday, values.gender, values.passwordZone.password);
    this.store.dispatch(registerUser({user}));
  }
}
