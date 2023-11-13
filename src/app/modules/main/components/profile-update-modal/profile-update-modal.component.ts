/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoadingController, PopoverController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-profile-update-modal',
  templateUrl: './profile-update-modal.component.html',
  styleUrls: ['./profile-update-modal.component.scss'],
})
export class ProfileUpdateModalComponent implements OnInit {

  @Input() userID!: string;
  @Input() userData?: any;

  personalInformationForm!: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControllers: any = [];
  constructor(private fb: FormBuilder, private popoverController:PopoverController, private imageService:ImageService , public global:GlobalService , private userService:UserService,
    private loadingController:LoadingController) {}

  ngOnInit() {
    this.personalInformationForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      // eslint-disable-next-line no-useless-escape
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      profilePhotoURL: new FormControl('', []),
    });

    this.formControllers = Object.keys(
      this.personalInformationForm.controls
    ).map((formControlName) => {
      return {
        formControlName: formControlName,
        label: this.createLabel(formControlName),
        placeholder: `Lütfen ${this.createLabel( formControlName )} bilgisini giriniz...`,
        type: this.getType(formControlName)
      };
    });

    if(this.userData){
      this.personalInformationForm.setValue({
        name: this.userData.displayName,
        email: this.userData.email,
        profilePhotoURL: this.userData.photoURL
      })
    }

  }

  createLabel(formControlName: string): string {
    switch (formControlName) {
      case 'name':
        return 'İsim';
      case 'phoneNumber':
        return 'Telefon Numarası';
      case 'email':
        return 'E-posta';
      case 'profilePhotoURL':
        return 'Profil Fotografı';
      default:
        return formControlName;
    }
  }

  getType(formControlName: string): string {
    switch (formControlName) {
      case 'name':
        return 'text';
      case 'phoneNumber':
        return 'tel';
      case 'email':
        return 'email';
      case 'profilePhotoURL':
        return 'photo-upload';
      default:
        return "text";
    }
  }

  triggerFileUpload(event:any){
    event.stopPropagation()
    let photo: any;
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*')
    input.onchange = (event:any) => {
      photo = event.target.files[0];
      console.log(event.target.files[0])
      const loading = this.loadingController.create({
        animated: true,
        spinner: 'crescent',
        message: 'Yükleniyor...',
        translucent: true,
        mode: 'ios',
      })
      loading.then((load) => { load.present() })
      this.imageService.uploadFile(photo, `users/${this.userID}`).then((downloadURL) => {
        this.personalInformationForm.setValue({...this.personalInformationForm.value , profilePhotoURL: downloadURL})
        loading.then((load) => { load.dismiss() })
      }).catch((err) => {
        console.log(err);
        loading.then((load) => { load.dismiss() })  
      });
    };
    input.click();
  }

  close(){
    this.popoverController.dismiss();
  }
  save(){
    if(this.personalInformationForm.valid){
      console.log(this.personalInformationForm.value)
      this.userService.setProfileData(this.personalInformationForm.value,this.userID).then(res=>console.log(res)).catch(err=>console.log(err))
    }
    this.popoverController.dismiss();
    
  }
}
