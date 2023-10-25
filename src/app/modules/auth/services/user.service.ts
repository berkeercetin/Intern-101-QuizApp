import { Injectable, inject } from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import { CollectionReference,updateDoc, DocumentReference, Firestore, addDoc, collection, doc, getDoc, query, setDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore);
  users$!: Observable<UserProfile[]>;
  usersCollection!: CollectionReference;
  constructor(private route:ActivatedRoute) { }

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

  async checkLearningDeck(deckID:any,uid:any){

    const docRef = doc(this.firestore, "/users/"+ uid +"/startedDecks/"+deckID);
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

 addLearningDeck(deckID:any,uid:any){
  const deckRef = collection(this.firestore, "/users/"+uid+ "/startedDecks");
  const learningWord={
    deckID:deckID,
    lastLearningCardIndex:0,
    lastQuizCardIndex:0,
    _sync:Date.now()
  }
  return setDoc(doc(deckRef, deckID),learningWord).then(res=>console.log(res)).catch(err=>console.log("err:"+err))

 }

 updateDeck(deckID:any,uid:any,index:any,type:any){
  const deckRef = collection(this.firestore, "/users/"+uid+ "/startedDecks");
  let learningDeck = {}
  if (type=="quiz"){
     learningDeck={
      lastQuizCardIndex:index,
      _sync:Date.now()
    }
  }
  else{
     learningDeck={
      lastLearningCardIndex:index,
      _sync:Date.now()
    }

  }
  console.log(learningDeck)

  updateDoc(doc(deckRef, deckID),learningDeck).then(res=>console.log(res)).catch(err=>console.log("err:"+err))
  //return setDoc(doc(deckRef, deckID),learningWord).then(res=>console.log(res)).catch(err=>console.log("err:"+err))

 }
}
