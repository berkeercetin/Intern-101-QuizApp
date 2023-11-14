import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'words',
        loadChildren: () => import('./pages/word-memorize-page/word-memorize-page.module').then( m => m.WordMemorizePagePageModule)
      },
      {
        path: 'word-cards-subjects',
        loadChildren: () => import('./pages/word-cards-subjects/word-cards-subjects.module').then( m => m.WordCardsSubjectsPageModule)
      },
      {
        path: 'word-cards-deck',
        loadChildren: () => import('./pages/word-cards-deck/word-cards-deck.module').then( m => m.WordCardsDeckPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'answer',
        loadChildren: () => import('./modals/answer/answer.module').then( m => m.AnswerPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
      },
      {
        path: 'scoreboard',
        loadChildren: () => import('./pages/scoreboard/scoreboard.module').then( m => m.ScoreboardPageModule)
      },
      {
        path: 'update-phone-number',
        loadChildren: () => import('./pages/update-phone-number/update-phone-number.module').then( m => m.UpdatePhoneNumberPageModule)
      },
      {
        path: 'update-email',
        loadChildren: () => import('./pages/update-email/update-email.module').then( m => m.UpdateEmailPageModule)
      },
    ]
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
