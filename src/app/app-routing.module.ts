import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncryptionComponent } from './encryption/encryption.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'encryption', component: EncryptionComponent }, 
  { path: 'validation', component: ValidationComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
