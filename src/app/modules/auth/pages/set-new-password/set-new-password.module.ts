import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetNewPasswordPageRoutingModule } from './set-new-password-routing.module';

import { SetNewPasswordPage } from './set-new-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SetNewPasswordPageRoutingModule
  ],
  declarations: [SetNewPasswordPage]
})
export class SetNewPasswordPageModule {}
