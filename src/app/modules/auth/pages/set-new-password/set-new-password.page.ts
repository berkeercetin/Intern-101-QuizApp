import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.page.html',
  styleUrls: ['./set-new-password.page.scss'],
})
export class SetNewPasswordPage implements OnInit {
  mode = this.route.snapshot.queryParams['mode'];
  code = this.route.snapshot.queryParams['oobCode'];

  ionicForm!:FormGroup
  isSubmitted = false;
  password!: string;
  repeatPassword!: string
  
  constructor(private router: Router,private auth:AuthService,private loadingController:LoadingController,private route : ActivatedRoute) { }
  
  get errorControl() { return this.ionicForm.controls;}

  ngOnInit() {
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
