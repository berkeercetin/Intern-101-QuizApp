import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private auth: Auth = inject(Auth);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public userSubject = new BehaviorSubject<any>(null);
  public userSubscription = this.userSubject.asObservable()
  public _users = user(this.auth);
  constructor() {
    this.trackUsers();
  }

  trackUsers(){
    this.auth.onAuthStateChanged( (userCredential) => {
      if(userCredential){
        console.log(userCredential);
        this.userSubject.next(userCredential);
      }
      else{ this.userSubject.next(null); }
    })
  }

  
}
