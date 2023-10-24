import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToAccount = () => redirectLoggedInTo(['/main/home']);
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToAccount } ,
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then( m => m.MainPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
