import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { AccountComponent } from './shared/account/account';

import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

import { DashboardComponent } from './admin/dashboard/dashboard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'account',
    component: AccountComponent,
    canActivate: [authGuard]
  },

  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];