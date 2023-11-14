import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  ionicForm!:FormGroup
  isSubmitted = false;
  password!: string;
  repeatPassword!: string
  
  constructor(private router: Router,private auth:AuthService,private loadingController:LoadingController, private toastController: ToastController) { }
  
  get errorControl() { return this.ionicForm.controls;}

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
      this.auth.updatePassword(this.ionicForm.value.oldPassword ,this.ionicForm.value.newPassword)
      .then(res => {
        console.log("basarılı:"+res);
        this.router.navigateByUrl('/main/home');
        this.loadingController.dismiss();
        this.toastController.create({
          animated:true,
          duration:5000,
          mode:"ios",
          message:"Password has been changed",
          icon:"mail-outline"
        }).then(toast => { toast.present() })
      })
      .catch(err=>{
        this.loadingController.dismiss();
        this.toastController.create({
          animated:true,
          duration:5000,
          mode:"ios",
          message:"Error on " + err,
          icon:"alert-circle-outline"
        }).then(toast => { toast.present() })
      })
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