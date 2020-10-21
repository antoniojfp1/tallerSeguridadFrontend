import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../users/user';
import { UsersService } from '../users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      const firstname = this.form.get('firstname').value;
      const lastname = this.form.get('lastname').value;

      const user = new User();
      user.username = username;
      user.password = password;
      user.lastname = lastname;
      user.name = firstname;
      
      
      this.userService.post(user).subscribe(response => {
        console.log(response);
      });

      
    }
  }

}
