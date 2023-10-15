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
    console.log(uid)
    console.log(wordID)

    const docRef = doc(this.firestore, "/users/"+ uid +"/learningWords/"+wordID);
    const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }

  }

 addLearningWord(word:any,uid:string){
  let learningWord = {
    ...word,
    learningPercentage:0,
    _sync:Date.now()
  }
  const learningWordsRef = collection(this.firestore, "/users/"+ uid +"/learningWords");
  return setDoc(doc(learningWordsRef, learningWord.wordID), word)
 }

}
