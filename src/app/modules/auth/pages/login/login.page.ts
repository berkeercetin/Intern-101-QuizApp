import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 ionicForm!:FormGroup
 isSubmitted = false;
 password: string | any;
 repeatPassword: string | any;
 isChecked: boolean | undefined;
  constructor(private router: Router,private auth:AuthService,private alertController:AlertController,private loadingController:LoadingController) { }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }
  async submitForm() {
    const spinner = (await this.loadingController.create({message: 'Giriş Yapılıyor...', spinner: 'crescent'}));
    spinner.present();
    this.isSubmitted = true;
    if (this.ionicForm.valid) {
      console.log(this.ionicForm.value)
      await this.auth.login(this.ionicForm.value.email, this.ionicForm.value.password)
      .then(res =>  { console.log(res);this.router.navigateByUrl('/main/home'); spinner.dismiss();})
      .catch(async err => { console.log(err); spinner.dismiss();
        if(err?.code === 'auth/invalid-email') {
          (await this.alertController.create({
            header: 'Email Hatalı',
            backdropDismiss:true,
            message: 'Girdiğiniz eposta adresi hatalı lütfen tekrar deneyin.',
            buttons:[{role:'cancel',text:'Tamam'}]})).present();
         }
        else if(err?.code === 'auth/wrong-password') {
          (await this.alertController.create({
            header: 'Parola Hatalı',
            backdropDismiss: true,
            message: 'Girdiğiniz parola hatalı; lütfen parolanızı sıfırlayın veya tekrar deneyin.',
            mode:'ios',
            buttons:[
              {text:'Parolamı Sıfırla',handler:()=>this.router.navigateByUrl('/authentication/forgot-password')},
              {role:'cancel',text:'Tamam'}
            ]
          })).present();
        }
        else if(err?.code === 'auth/user-not-found') {
          (await this.alertController.create({
            header: 'Fazla Hatalı Giriş',
            backdropDismiss:true,
            message: 'Çok fazla hatalı giriş yaptınız. Parolanızı sıfırlayabilir veya bir süre bekledikten sonra tekrar deneyebilirsiniz.',
            buttons:[
              {text:'Parolamı Sıfırla',handler:()=>this.router.navigateByUrl('/authentication/forgot-password')},
              {role:'cancel',text:'Tamam'}
            ]
          })).present();
        }
        else if(err?.code === 'auth/internal-error') {
          (await this.alertController.create({
            header: 'Hata',
            backdropDismiss:true,
            message: 'Hatalı veya eksik veri grdiniz. Lütfen tekrar deneyin.',
            buttons:[ {role:'cancel',text:'Tamam'} ]
          })).present();
         }
        else if(err?.code === 'auth/too-many-requests'){
          (await this.alertController.create({
            header: 'Fazla Hatalı Giriş',
            backdropDismiss:true,
            message: 'Çok fazla hatalı giriş yaptınız. Parolanızı sıfırlayabilir veya bir süre bekledikten sonra tekrar deneyebilirsiniz.',
            buttons:[ {role:'cancel',text:'Tamam'} ]
          })).present();
        }
        else if(err?.code === 'auth/network-request-failed') {
          (await this.alertController.create({
            header: 'Bağlantı Hatası',
            backdropDismiss: true,
            message: 'Lütfen internet bağlantınızı kontrol edin.',
            buttons:[ {role:'cancel',text:'Tamam'} ]
          })).present();
        }
       })
      .finally(() => {  });
    }
    else{spinner.dismiss();}
  }

  
  forgotPassword(){}


}
