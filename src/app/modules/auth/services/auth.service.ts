import { Injectable, inject } from '@angular/core';
import { Auth,GoogleAuthProvider,updatePassword, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor(private router: Router) { }

  isLogged(){
    if(this.auth.currentUser)
    return this.auth.currentUser.uid

    return false
  }

  async byGoogle(): Promise<UserCredential> {
    return await signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  async updatePassword(oldPassword:string,newPassword:string){
    signInWithEmailAndPassword(this.auth, this.auth.currentUser!.email!.trim(), oldPassword.trim()).then(()=>{
      return updatePassword(this.auth.currentUser!, newPassword)
    })
  }
  
  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      email.trim(),
      password.trim()
    );
  }

   login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
    }


    sendResetPasswordEmail(email:string){
      return sendPasswordResetEmail(this.auth,email)
    }

    
    signOut(){
      return this.auth.signOut()
    }

    
}
