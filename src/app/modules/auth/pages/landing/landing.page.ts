import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit() {
  }
  login(){
    this.router.navigateByUrl("login")
  }
  register(){
    this.router.navigateByUrl("register")
  }
  google(){this.auth.byGoogle()}
  // page = 
  //   {
  //     items:[
  //       {
  //         type:"button",
  //         buttonText:"Giriş Yap"
  //       },
  //       {
  //         type:"divider",
  //         buttonText:"Giriş Yap"
  //       }
  //     ]
  //   }


}
