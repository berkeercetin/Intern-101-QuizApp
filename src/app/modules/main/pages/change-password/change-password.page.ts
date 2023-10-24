import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  ionicForm!:FormGroup
  isSubmitted = false;
  password: string | any;
  repeatPassword: string | any;
  
  constructor(private router: Router,private auth:AuthService,private alertController:AlertController,private loadingController:LoadingController) { }
  
  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeat: new FormControl('', Validators.required),
    }, {
      validators: MustMatch('newpassword', 'repeat') as any
    });
  }

  submitForm() {
    this.isSubmitted = true;
    
    if (this.ionicForm.valid ) {
      console.log(this.ionicForm.value)
      this.loadingController.create({message:'Şifre Sıfırlanıyor', spinner:'crescent', animated:true})
      .then(res => res.present());
      this.auth.updatePassword(this.ionicForm.value.repeat)
      .then(res => {console.log("basarılı:"+res);this.router.navigateByUrl('/main/home');})
      .catch(err=>console.log(err))
      .finally(() => { this.loadingController.dismiss(); });
    }
  }


}
function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}