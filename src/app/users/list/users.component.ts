import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSource :any = [
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
    {
      id: 1,
      username: 'Modirator',
      email: 'lagyassine@gmail.com',
      name: 'Leonhard Euler',
      role: 'admin',
      image: 'https://demos.lagrida.com/files/images/euler.png',
      created_at: new Date('2021-04-04')
    },
  ];
  displayedColumns: string[] = ['id', 'img', 'username', 'email', 'name', 'role', 'created_at'];
  constructor() { }

  ngOnInit(): void {
  }

}
