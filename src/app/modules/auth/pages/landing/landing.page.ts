import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private router:Router,private auth:AuthService,private userService:UserService) { }

  ngOnInit() {
  }
  login(){
    this.router.navigateByUrl("login")
  }
  register(){
    this.router.navigateByUrl("register")
  }

  
  google(){
    this.auth.byGoogle().then(res=>{
      this.userService.addUserProfile(JSON.parse(JSON.stringify(res.user)),res.user.uid)?.then(
        res=>this.router.navigateByUrl("/main/home")
      ).catch(err=>console.log(err))
    }).catch(err=>console.log("err google"+err))
  }


}
