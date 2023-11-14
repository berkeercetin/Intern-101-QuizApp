import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordMemorizePagePage } from './word-memorize-page.page';

const routes: Routes = [
  {
    path: '',
    component: WordMemorizePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordMemorizePagePageRoutingModule {}
