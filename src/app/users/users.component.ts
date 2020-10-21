import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { User } from './user';
import { UsersService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UsersService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    const token = this.storageService.userinfo.token;
    this.userService.get(token).subscribe(response => {
      this.users = response.data;
    });
  }

}
