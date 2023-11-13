import { Injectable, inject } from '@angular/core';
import { Auth, verifyPasswordResetCode, GoogleAuthProvider, updatePassword, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, confirmPasswordReset } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor(private router: Router) { }

  isLogged() {
    if (this.auth.currentUser)
      return this.auth.currentUser.uid

    return false
  }

  createPasswordResetLink(email: string) {
    return sendPasswordResetEmail(this.auth, email, { url: ' ' });
  }

  resetPasswordInit(email: string) {
    return sendPasswordResetEmail(
      this.auth,
      email,
      { url: 'http://localhost:8100/login' })
  }

  verifyCode(code: string) {
    return verifyPasswordResetCode(this.auth, code)
  }

  async setNewPassword(oobCode: string, newPassword: string): Promise<void> {
    return confirmPasswordReset(this.auth, oobCode, newPassword).then(() => {
      // Password reset successful
    }).catch((error) => {
      console.log(error)
      // Handle error
    });
  }

  async byGoogle(): Promise<UserCredential> {
    return await signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  async updatePassword(oldPassword: string, newPassword: string) {
    signInWithEmailAndPassword(this.auth, this.auth.currentUser!.email!.trim(), oldPassword.trim()).then(() => {
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


  sendResetPasswordEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email)
  }


  signOut() {
    return this.auth.signOut()
  }


  


}
