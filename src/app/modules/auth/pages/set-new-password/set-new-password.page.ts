import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.page.html',
  styleUrls: ['./set-new-password.page.scss'],
})
export class SetNewPasswordPage implements OnInit {
  // Shared for all recived email handle
  mode = this.route.snapshot.queryParams['mode'];
  code = this.route.snapshot.queryParams['oobCode'];

  // ChangePassword
  ionicForm!:FormGroup
  isSubmitted = false;
  password!: string;
  repeatPassword!: string
  

  // Change Email
  emailForm:FormGroup;


  constructor(private router: Router,private auth:AuthService,private loadingController:LoadingController,private route : ActivatedRoute,private alertController:AlertController,private userService:UserService, private toastController: ToastController) {
    this.emailForm = new FormGroup({
      email: new FormControl("" , [Validators.required , Validators.email])
    })
  }
  
  get errorControl() { return this.ionicForm.controls;}

  ngOnInit() {
    console.log(this.mode)
  }
  
  ionViewWillEnter(){
    this.ionicForm = new FormGroup({
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
      this.auth.setNewPassword(this.code,this.ionicForm.value.newPassword).then(()=>{alert("basarılı") ;this.router.navigateByUrl('/login')}).catch(err=>{alert(err)}).finally(()=>{this.loadingController.dismiss();})

    }else{
      this.alertController.create({message:'Şifreler Eşleşmiyor',buttons:['Tamam']}).then(res=>res.present())
    }
  }

  submitNewEmail(){
    if(this.emailForm.valid){
      // handle email change
      this.loadingController.create({message:'Email güncelleniyor', spinner:'crescent', animated:true}).then( ctrl => ctrl.present())
      this.userService.initActionCodeForEmail(this.code).then( (res) => {
      this.loadingController.dismiss();
      this.toastController.create({
        animated:true,
        duration:5000,
        mode:"ios",
        message:"Email has been updated",
        icon:"mail-outline",
      }).then(toast => { toast.present()})
      this.router.navigateByUrl('/main/home');
    }
      ).catch(err => {
        this.toastController.create({
          animated:true,
          duration:5000,
          mode:"ios",
          message:"Error on update " +err,
          icon:"alert-circle-outline"
        }).then(toast => { toast.present()})
      })
    } else {
      this.toastController.create({
        animated:true,
        duration:5000,
        mode:"ios",
        message:"Please enter valid email.",
        icon:"alert-circle-outline"
      }).then(toast => { toast.present()})
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
