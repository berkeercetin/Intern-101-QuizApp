import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private _location: Location,public _router:Router,private authService:AuthService) { }

  ngOnInit() {
  }
  back(){
    this._location.back();
  }
  checkRoute(){
    if(this._router.url=="/main/home")
      return false
    return true
  }
  signOut(){
    this.authService.signOut().then(res=>this._router.navigateByUrl(""))
  }
 learningregexPattern = /\/main\/word-cards-deck\/learning\/[A-Za-z0-9]+/;
 learningQuizPattern = /\/main\/word-cards-deck\/quiz\/[A-Za-z0-9]+/;


  findPageTitle(){
    if(this.learningregexPattern.test(this._router.url)){
      return "Öğren"

    }
    if(this.learningQuizPattern.test(this._router.url)){
      return "Quiz"
    }
    if(this._router.url=="/main/home")
      return "Anasayfa"
      if(this._router.url=="/main/words")
      return "Analizler"
      if(this._router.url=="/main/word-cards-subjects/quiz")
      return "Quizler"
      if(this._router.url=="/main/word-cards-subjects/learning")
      return "Öğren"
    if(this._router.url=="/main/word-cards-subjects")
      return "word-cards-subjects"
    if(this._router.url=="/main/word-cards-deck")
      return "word-cards-deck"
      if(this._router.url=="/main/settings")
      return "Ayarlar"
      if(this._router.url=="/main/profile")
      return "Profil"
      if(this._router.url=="/main/contact")
      return "İletişim"

    
      return "isimsiz"
  }
}
