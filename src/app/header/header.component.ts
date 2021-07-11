import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../models/user';
import { AppState } from '../reducers';
import { getIsConnected, getUser } from '../users/store/global-users.selectors';
import { logout } from '../users/store/users-action.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() drawer : any;
  isConnected: Observable<boolean> = EMPTY;
  user: Observable<User | null> = EMPTY;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isConnected = this.store.select(getIsConnected);
    this.user = this.store.select(getUser);
  }
  logout(){
    this.store.dispatch(logout());
  }
}
