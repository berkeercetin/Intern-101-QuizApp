import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  ionicForm!: FormGroup ;
  isSubmitted = false;
  
  constructor(   private modalController:ModalController,
    private router: Router, 
    private formBuilder:FormBuilder, 
    private loadingController:LoadingController,
    private alertController:AlertController,
    private userService:UserService) { }

    ngOnInit() {
      this.ionicForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', Validators.required),
      });
    }

  submitForm() {
    this.isSubmitted = true;
    console.log(this.ionicForm.value)
    if (this.ionicForm.valid ) {
      this.loadingController.create({message:'Kayıt Yapılıyor...', spinner:'crescent', animated:true})
      .then(res => res.present());
    }
  }

}
