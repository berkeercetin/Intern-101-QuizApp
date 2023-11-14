import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEmailPageRoutingModule } from './update-email-routing.module';

import { UpdateEmailPage } from './update-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateEmailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateEmailPage]
})
export class UpdateEmailPageModule {}
