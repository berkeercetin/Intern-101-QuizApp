import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordCardsSubjectsPageRoutingModule } from './word-cards-subjects-routing.module';

import { WordCardsSubjectsPage } from './word-cards-subjects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordCardsSubjectsPageRoutingModule
  ],
  declarations: [WordCardsSubjectsPage]
})
export class WordCardsSubjectsPageModule {}
