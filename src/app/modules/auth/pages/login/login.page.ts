import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseErrors } from 'src/app/shared/firebaseError.handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 ionicForm?:FormGroup
 isSubmitted = false;
 password?: string;
 repeatPassword?: string
isChecked: boolean | undefined;
  constructor(private router: Router,private auth:AuthService,private alertController:AlertController,private loadingController:LoadingController) { }
  
  get errorControl() {return this.ionicForm?.controls;}
  
  ngOnInit() {}

  ionViewWillEnter(){
    this.ionicForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }
  
  async submitForm() {
    const spinner = (await this.loadingController.create({message: 'Giriş Yapılıyor...', spinner: 'crescent'}));
    console.log(this.ionicForm?.value)
    spinner.present();
    this.isSubmitted = true;
    if (this.ionicForm?.valid) {
      console.log(this.ionicForm.value)
      await this.auth.login(this.ionicForm.value.email, this.ionicForm.value.password)
      .then(res =>  { console.log(res);this.router.navigateByUrl('/main/home'); spinner.dismiss();})
      .catch(async err => { console.log(err); spinner.dismiss();
        const errorObject = FirebaseErrors.Parse(err.code); 
          (await this.alertController.create({
            header: errorObject.header,
            backdropDismiss:true,
            message: errorObject.message,
            buttons:[{role:'cancel',text:'Tamam'}]})).present();
       })
      .finally(() => { this.loadingController.dismiss(); });
    }else{
      spinner.dismiss();
    }
  }

  
  forgotPassword(){
    this.router.navigateByUrl("/forgot-password")
  }


}
