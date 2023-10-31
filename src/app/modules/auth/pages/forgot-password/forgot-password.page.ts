import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  ionicForm!:FormGroup
  isSubmitted = false;
  password!: string
  repeatPassword!: string
  
  constructor(private router: Router,private auth:AuthService,private loadingController:LoadingController) { }
  
  get errorControl() {return this.ionicForm.controls;}

  

  ngOnInit() {
    this.ionicForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.ionicForm.valid ) {
      console.log(this.ionicForm.value)
      this.loadingController.create({message:'E posta yollanıyor..', spinner:'crescent', animated:true})
      .then(res => res.present());
       this.auth.sendResetPasswordEmail(this.ionicForm.value.email)
       .then(res => {console.log("basarılı:"+res);this.router.navigateByUrl('/login');})
       .catch(err=>console.log(err))
       .finally(() => { this.loadingController.dismiss(); });
    //  this.auth.createPasswordResetLink(this.ionicForm.value.email).finally(() => { this.loadingController.dismiss(); });
    }
  }
}
