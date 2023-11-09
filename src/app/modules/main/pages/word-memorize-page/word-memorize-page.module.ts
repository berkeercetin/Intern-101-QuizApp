import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordMemorizePagePageRoutingModule } from './word-memorize-page-routing.module';

import { WordMemorizePagePage } from './word-memorize-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordMemorizePagePageRoutingModule
  ],
  declarations: [WordMemorizePagePage]
})
export class WordMemorizePagePageModule {}
