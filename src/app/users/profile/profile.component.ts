import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User;
  isProfile : Boolean = true;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.user = this.usersService.getUser();
  }

}
