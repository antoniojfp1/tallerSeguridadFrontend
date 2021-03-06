import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../users/user';
import { UsersService } from '../users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(regExps.password)]]
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
        this.router.navigate(['./../']);
      }, error => {
        this.message = error.error.message;
      });

      
    } else {
      this.message = 'Validar campos requeridos y que la contraseña sea válida';
    }
  }

  singOut(){
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute })
  }

}

export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*?&])[A-Za-z\d@$!.%*?&]{8,}$/gm
};

