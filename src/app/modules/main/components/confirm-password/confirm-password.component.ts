import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { UserModel } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss'],
})
export class ConfirmPasswordComponent  implements OnInit {
  userData?:UserModel
  passwordForm:FormGroup
  constructor(public global:GlobalService, private fb : FormBuilder, private popoverController: PopoverController) {
    this.passwordForm = this.fb.group({
      password: ['' , [Validators.required , Validators.minLength(6)]]
    })
  }

  ngOnInit() {
    this.global.userSubscription.subscribe(res => {
      this.userData = new UserModel(res)
    })
  }

  save(){
    this.popoverController.dismiss({password:this.passwordForm.value} , "saved")
  }
  close(){
    this.popoverController.dismiss({password:""} , "cancel")

  }

}
