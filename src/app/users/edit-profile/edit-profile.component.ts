import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = new User('', '', '', '', '', '');
  birthday: Date = new Date('2020-05-06');

  constructor() { }

  ngOnInit(): void {}

  handleSubmit(event:any){}

}
