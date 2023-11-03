import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  constructor(private router: Router,private auth:AuthService,private loadingController:LoadingController,private route:ActivatedRoute) { }
  
  mode = this.route.snapshot.queryParams['mode'];
  code = this.route.snapshot.queryParams['oobCode'];

  ngOnInit() {}

  ionViewWillEnter() {
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
       this.auth.resetPasswordInit(this.ionicForm.value.email) 
      .then(
        () => alert('A password reset link has been sent to your email address'), 
        (rejectionReason) => alert(rejectionReason)) 
      .catch(e => alert('An error occurred while attempting to reset your password'+e))
      .finally(() => { this.loadingController.dismiss(); }); 
    }
  }
}
