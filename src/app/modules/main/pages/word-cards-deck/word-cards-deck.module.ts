import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordCardsDeckPageRoutingModule } from './word-cards-deck-routing.module';

import { WordCardsDeckPage } from './word-cards-deck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordCardsDeckPageRoutingModule
  ],
  declarations: [WordCardsDeckPage]
})
export class WordCardsDeckPageModule {}
