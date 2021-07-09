import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { PageableUsers } from 'src/app/models/pageable-users';
import { AppState } from 'src/app/reducers';
import { setCommonErrorMessage } from 'src/app/reducers/common.actions';
import { ROLES, RolesInterface } from 'src/app/roles';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loading: boolean = true;
  isFullFeed: boolean = false;
  dataSource: PageableUsers;
  readonly pages = {
    pageNumber: 0,
    pageSize: 10
  }
  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'img', 'username', 'email', 'name', 'roles', 'createdOn'];
  constructor(public usersService: UsersService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(setCommonErrorMessage({ message: '' }));
    this.loadUser(this.pages.pageNumber, this.pages.pageSize);
  }
  loadUser(pageNumber: number, pageSize: number): void{
    this.usersService.getUsers(pageNumber, pageSize).subscribe(
      (response: any) => {
        this.loading = false;
        this.isFullFeed = true;
        this.dataSource = response;
      },
      error => {
        let message = '';
        this.loading = false;
        if(error.error && error.error.error){
          message = error.error?.error + ' : ' + error.error?.message;
        }else{
          message = error?.message;
        }
        this.store.dispatch(setCommonErrorMessage({ message }));
      }
    );
  }
  handleChange(event: PageEvent){
    // { previousPageIndex: 0, pageIndex: 1, pageSize: 10, length: 22 }
    this.loading = true;
    this.isFullFeed = false;
    this.loadUser(event.pageIndex, event.pageSize);
  }

}
