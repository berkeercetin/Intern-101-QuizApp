import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordCardsSubjectsPage } from './word-cards-subjects.page';

const routes: Routes = [
  {
    path: ':type',
    component: WordCardsSubjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordCardsSubjectsPageRoutingModule {}
