import { Injectable, inject } from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, doc, getDoc, query, setDoc, where } from '@angular/fire/firestore';
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

  async checkLearningWord(wordID:any,uid:any){

    const docRef = doc(this.firestore, "/users/"+ uid +"/learningWords/"+wordID);
    const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return false
        } else {
          // docSnap.data() will be undefined in this case
          return true          
        }

  }

 addLearningWord(wordID:any,uid:any){
  const learnRef = collection(this.firestore, "/users/"+uid+ "/learningWords");
  const learningWord={
    wordID:wordID,
    learningPercentage:0,
    _sync:Date.now()
  }
  return setDoc(doc(learnRef, wordID),learningWord).then(res=>console.log(res)).catch(err=>console.log("err:"+err))

 }
}
