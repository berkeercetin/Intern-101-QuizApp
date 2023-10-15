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
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
