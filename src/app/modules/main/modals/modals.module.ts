import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScoreboardBadgesComponent } from './scoreboard-badges/scoreboard-badges.component';



@NgModule({
  declarations: [
    ScoreboardBadgesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports:[ScoreboardBadgesComponent]
})
export class ModalsModule { }
