import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UsersService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoiYWZlcm5hbmRleiIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MDMxNDk1MzQsImV4cCI6MTYwMzE1MDEzNH0.ZIYBxdbLYfJrms2MD7eZ79Wcd2_x09u20a_A_FY8Aom88qziTGzX02AmVMN3biv-W163L_jfguDf06b9o4Mv1g';
    this.userService.get(token).subscribe(response => {
      console.log('Ingresando al servicio');
      this.users = response.data;
    });
  }

}
