import { Injectable, inject } from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore);
  users$!: Observable<UserProfile[]>;
  usersCollection!: CollectionReference;
  constructor() { }

  addUserProfile(user: any,uid:any) {
    if (!user) return;
    user.uid=uid
    const usersRef = collection(this.firestore, "users");
    return setDoc(doc(usersRef, uid), user)

}

}
