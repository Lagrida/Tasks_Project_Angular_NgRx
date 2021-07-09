import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  readonly isProfile: boolean = false;
  loading: boolean = true;
  isFullFeed: boolean = false;
  errorObj = {
    message: '',
    isError: false
  };
  user: User;

  constructor(private usersService: UsersService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    //this.route.snapshot.params['id']
    this.usersService.getOneUser(this.route.snapshot.params['id']).subscribe(
      (response: any) => {
        this.loading = false;
        this.isFullFeed = true;
        this.user = response;
      },
      (error: any) => {
        this.loading = false;
        this.errorObj.isError = true;
        console.log(error);
        if(error.error){
          this.errorObj.message = error.error?.title + ' : ' + error.error?.message;
        }else{
          this.errorObj.message = error?.message;
        }
      }
    );
  }

}
