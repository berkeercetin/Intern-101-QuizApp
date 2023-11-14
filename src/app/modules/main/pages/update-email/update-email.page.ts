import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { GlobalService } from 'src/app/services/global.service';
import { ConfirmPasswordComponent } from '../../components/confirm-password/confirm-password.component';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  emailForm: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userSubscription: Observable<any>;
  userPassword: string = "";
  constructor(private fb: FormBuilder, private toastController: ToastController, private popoverController: PopoverController, private userService: UserService, private loadingController: LoadingController, private global: GlobalService) {
    this.emailForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    })

    this.userSubscription = this.global.userSubscription
  }

  ngOnInit() { }


  submit() {
    this.popoverController.create({
      component: ConfirmPasswordComponent,
      animated: true,
      backdropDismiss: false,
      cssClass: "mak-popover",

    }).then(popoverCtl => {
      popoverCtl.present();
      popoverCtl.onDidDismiss().then((res) => {
        console.log(res)
        if (res.role === 'saved') {

          if (this.emailForm.valid) {
            this.loadingController.create({ message: 'Email gönderiliyor', spinner: 'crescent', animated: true })
              .then(res => res.present());

            this.userService.updateEmail(this.emailForm.value.email, res.data.password).then(() => {
              this.loadingController.dismiss();
              this.toastController.create({
                animated: true,
                duration: 5000,
                mode: "ios",
                message: "Email has been sent",
                icon: "mail-outline"
              }).then(toast => { toast.present() })
            }).catch((err) => {
              this.loadingController.dismiss();
              this.toastController.create({
                animated: true,
                duration: 5000,
                mode: "ios",
                message: "Error on " + err,
                icon: "alert-circle-outline"
              }).then(toast => { toast.present() })
            })
          } else {
            this.toastController.create({
              animated: true,
              duration: 5000,
              mode: "ios",
              message: "Please enter email",
              icon: "alert-circle-outline"
            }).then(toast => { toast.present() })
          }

        } else {
          this.toastController.create({
            animated: true,
            duration: 5000,
            mode: "ios",
            message: "Please enter your password",
            icon: "alert-circle-outline"
          }).then(toast => { toast.present() })
        }






      })



    })




  }
}
