import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordCardsDeckPage } from './word-cards-deck.page';

const routes: Routes = [
  {
    path: ':deckID',
    component: WordCardsDeckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordCardsDeckPageRoutingModule {}
