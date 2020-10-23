import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncryptionComponent } from './encryption/encryption.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { UsersComponent } from './users/users.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'encryption', canActivate: [AuthGuard], component: EncryptionComponent }, 
  { path: 'validation', canActivate: [AuthGuard], component: ValidationComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
