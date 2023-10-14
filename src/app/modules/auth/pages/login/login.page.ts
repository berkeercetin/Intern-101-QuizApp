import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private auth:AuthService) { }

  ngOnInit() {
  }

  login(){this.router.navigateByUrl("/main/home")}
  forgotPassword(){}


}
