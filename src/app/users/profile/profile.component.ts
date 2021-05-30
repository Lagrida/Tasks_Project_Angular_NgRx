import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() user : User = new User('', '', '', '', '', '');
  @Input() isProfile : Boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
