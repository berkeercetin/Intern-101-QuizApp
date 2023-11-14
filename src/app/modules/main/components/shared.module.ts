import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUpdateModalComponent } from './profile-update-modal/profile-update-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';



@NgModule({
  declarations: [
    ProfileUpdateModalComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    ProfileUpdateModalComponent,
    ConfirmPasswordComponent
  ]
})
export class SharedModule { }
