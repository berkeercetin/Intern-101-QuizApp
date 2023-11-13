import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePhoneNumberPageRoutingModule } from './update-phone-number-routing.module';

import { UpdatePhoneNumberPage } from './update-phone-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePhoneNumberPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatePhoneNumberPage]
})
export class UpdatePhoneNumberPageModule {}
