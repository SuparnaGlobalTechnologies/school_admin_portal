import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './forgot/forgot.component';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      }
    ]
  },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ForgotComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    ShowHidePasswordModule
  ]
})
export class AuthModule { }
