import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';
import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.form.valid) {      
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      this.loginService.post(username, password).subscribe(response => {        
        const user:Login = response.data;
        this.storage.create(StorageService.STORAGE_USER,
          {
            username: user.username,
            token: user.token
          });
        this.router.navigate(['home'], { relativeTo: this.route });
      });
    }

  }


}
