import { Component, OnInit } from '@angular/core';
import { SessionActions } from 'app/core';
import {UsersService} from '../../services';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  users = [];

  constructor(private usersService: UsersService ) {}

  ngOnInit() {
    this.usersService.getUsers().first().subscribe(users => {
      this.users = users;
    });
  }



}
