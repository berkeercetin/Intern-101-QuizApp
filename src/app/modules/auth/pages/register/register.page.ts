import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TermsPage } from '../../modals/terms/terms.page';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FirebaseErrors } from 'src/app/shared/firebaseError.handler';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ionicForm!: FormGroup ;
  isSubmitted = false;
  password?: string 
  repeatPassword?: string 
  isChecked: boolean | undefined;

  get errorControl() {
    return this.ionicForm.controls;
  }
  constructor(
    private modalController:ModalController,
    private authService:AuthService,
    private router: Router, 
    private formBuilder:FormBuilder, 
    private loadingController:LoadingController,
    private alertController:AlertController,
    private userService:UserService
    ) { }
    
  ngOnInit() {}

  ionViewWillEnter(){
    this.ionicForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
    }, {
      validators: MustMatch('password', 'confirmPassword') as any
    });
  }
  
  submitForm() {
    this.isSubmitted = true;
    console.log(this.ionicForm.value)
    if (this.ionicForm.valid && this.isChecked) {
      this.loadingController.create({message:'Kayıt Yapılıyor...', spinner:'crescent', animated:true})
      .then(res => res.present());
      this.authService.signup(this.ionicForm.value.email, this.ionicForm.value.password)
      .then(res =>
        this.userService.addUserProfile(this.ionicForm.value,res.user.uid)?.then(()=>this.router.navigateByUrl('/main/home'))        )
      .catch(async err => {
        console.log(err)
          const errorObject = FirebaseErrors.Parse(err.code); 
            (await this.alertController.create({
              header: errorObject.header,
              backdropDismiss:true,
              message: errorObject.message,
              buttons:[{role:'cancel',text:'Tamam'}]})).present();
      })
      .finally(() => { this.loadingController.dismiss(); });
    }
    else{
      if(!this.isChecked){
        (this.alertController.create({
          header: 'Hata',
          backdropDismiss:true,
          message: 'Kullanım koşullarını kabul etmelisiniz',
          buttons:[{role:'cancel',text:'Tamam'}]})).then(res=>res.present());
      }else{
        (this.alertController.create({
          header: 'Hata',
          backdropDismiss:true,
          message: 'Lütfen formu eksiksiz doldurunuz',
          buttons:[{role:'cancel',text:'Tamam'}]})).then(res=>res.present());
      }
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TermsPage,
      backdropDismiss: false,
      componentProps: {
        'termName': "Kullanım Koşulları,",
        'termText': "Lorem ipsum sit dolor amet",
      }
    });
    return await modal.present();
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