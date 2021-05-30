import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../models/user';
import { AppState } from '../reducers';
import { UsersService } from '../services/users.service';
import { getIsConnected, getUser } from '../users/store/global-users.selectors';
import { getIsRegistred } from '../users/store/users.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() drawer : any;
  isConnected: Observable<boolean> = EMPTY;
  user: Observable<User | null> = EMPTY;

  constructor(private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.isConnected = this.store.select(getIsConnected);
    this.user = this.store.select(getUser);
  }
}
