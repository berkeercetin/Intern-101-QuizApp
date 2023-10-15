import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  constructor(private router: Router) { }

  isLogged(){
    if(this.auth.currentUser)
    return true

    return false
  }

  async byGoogle(): Promise<UserCredential> {
    return await signInWithPopup(this.auth, new GoogleAuthProvider())
  }
  
  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      email.trim(),
      password.trim()
    );
  }
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(
        this.auth,
        email.trim(),
        password.trim()
      );
    }

    sendResetPasswordEmail(email:string){
      return sendPasswordResetEmail(this.auth,email)
    }
    signOut(){
      return this.auth.signOut()
    }

    
}
