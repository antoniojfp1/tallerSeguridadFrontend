import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService,
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
      console.log('Enviando')
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      this.form.get('username').disable();
      this.form.get('password').disable();
      this.loginService.post(username, password).subscribe(response => {
        console.log('Autenticado');
        this.router.navigate(['home'], { relativeTo: this.route });
      });
    }

  }


}
