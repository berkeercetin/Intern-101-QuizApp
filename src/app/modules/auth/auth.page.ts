import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private _location: Location,public _router:Router,private auth:AuthService) { }

  ngOnInit() {
    if (this.auth.isLogged()){
      this._router.navigateByUrl('/main/home')
    }
    
  }
  back(){
    this._location.back();
  }
  checkRoute(){
    if(this._router.url=="/")
      return false
    return true
  }

  findPageTitle(){
    if(this._router.url=="/login")
      return "Giriş Yap"
    if(this._router.url=="/register")
      return "Kayıt Ol"
    if(this._router.url=="/forgot-password")
      return "Parolamı Unuttum"
    
      return "isimsiz"
  }
}
