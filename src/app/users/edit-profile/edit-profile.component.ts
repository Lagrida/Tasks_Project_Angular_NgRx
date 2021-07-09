import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user';
import { setUsersErrorMessage, toggleSubmitLoading, updateUser, usersSuccessMessage } from '../store/users-action.actions';
import { getSubmitLoading, getUsersErrorMessage } from '../store/users.selectors';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;
  form: any;
  submitLoading: Observable<boolean> = EMPTY;
  errorMessage: Observable<string> = EMPTY;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(toggleSubmitLoading({ submitLoading:false }));
    this.store.dispatch(usersSuccessMessage({ show:false }));
    this.store.dispatch(setUsersErrorMessage({errorMessage : ""}));

    this.submitLoading = this.store.select(getSubmitLoading);
    this.errorMessage = this.store.select(getUsersErrorMessage);

    this.user = this.usersService.getUser();
    this.form = this.formBuilder.group({
      username: [''],
      email: [''],
      name: [''],
      image: [''],
      birthday: [new Date('04/04/1993')],
      gender: ['MALE'],
    });
    this.form.patchValue({
      username: this.user.username,
      email: this.user.email,
      name: this.user.name,
      image: this.user.image,
      birthday: new Date(this.user.birthday),
      gender: this.user.gender,
    });
  }

  handleSubmit(form:any){
    const values = form.value;
    const birthday = values.birthday.toLocaleDateString() + ' 01:00';
    const user: User = new User(values.username, values.email, values.image, values.name, birthday, values.gender);
    this.store.dispatch(toggleSubmitLoading({ submitLoading:true }));
    this.store.dispatch(updateUser({user, id: this.user.id ?? 0}));
  }

}
