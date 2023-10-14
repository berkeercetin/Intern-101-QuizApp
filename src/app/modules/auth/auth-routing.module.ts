import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';


const routes: Routes = [
   {
     path: '',
     component: AuthPage,
     children:[
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
      }

     ]
   },
  {
    path: 'terms',
    loadChildren: () => import('./modals/terms/terms.module').then( m => m.TermsPageModule)
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
