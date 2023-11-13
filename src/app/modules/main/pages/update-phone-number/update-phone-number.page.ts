import { Component, OnInit } from '@angular/core';
import { RecaptchaVerifier } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-update-phone-number',
  templateUrl: './update-phone-number.page.html',
  styleUrls: ['./update-phone-number.page.scss'],
})
export class UpdatePhoneNumberPage implements OnInit {
  phoneNumberForm:FormGroup
  applicationVerifier!:RecaptchaVerifier
  loading:boolean = false;
  constructor(private fb: FormBuilder, private toastController:ToastController, private userService:UserService, private loadingController: LoadingController) {
   this.phoneNumberForm = this.fb.group({
      phoneNumber: new FormControl('', [Validators.required , Validators.pattern('[0-9]{10}')]),
    })
  }

  ngOnInit() {
    this.applicationVerifier = this.userService.reCaptchaVerifier();
  }


  submit(){    
    if(this.phoneNumberForm.valid){
      // this.applicationVerifier.clear();
      // console.log(this.phoneNumberForm.value.phoneNumber)
      // this.userService.sendVerificationCode(this.phoneNumberForm.value.phoneNumber,90)
      // .then(res => {
      //   console.log(res)
        this.loadingController.create({
          spinner:"dots"
        }).then( ctrl => ctrl.present() )
        const DUMMY_VERIFICATION_CODE = '123123';
        this.userService.updatePhoneNumber(this.phoneNumberForm.value.phoneNumber, DUMMY_VERIFICATION_CODE).then( () => {
          this.loadingController.dismiss(); 
          this.toastController.create({
            animated:true,
            duration:5000,
            message:"Phone number updated successfully",
            mode:"ios",
            icon:"checkmark-circle-outline"
          }).then(toast => { toast.present() })
        })


    // }).catch(err => {
    //   console.log(err)
    // })}
} else {
  this.toastController.create({
    animated:true,
    duration:5000,
    mode:"ios",
    message:"Please enter a valid phone number",
    icon:"alert-circle-outline"
  }).then(toast => { toast.present() })
}


}






}