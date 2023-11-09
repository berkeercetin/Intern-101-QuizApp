import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUpdateModalComponent } from './profile-update-modal/profile-update-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ProfileUpdateModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    ProfileUpdateModalComponent
  ]
})
export class SharedModule { }
