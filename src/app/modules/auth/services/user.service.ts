import { Injectable, inject } from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import { CollectionReference,updateDoc,collectionData , Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
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

  addUserProfile(user: any,uid:string) {
    if (!user) return;
    const userData = {
      email:user.email,
      name:user.name,
      uid:uid,
    }
  
    const usersRef = collection(this.firestore, "users");
    return setDoc(doc(usersRef, uid), userData)

}

  async checkLearningWord(wordID:string,uid:string){

    const docRef = doc(this.firestore, "/users/"+ uid +"/learningWords/"+wordID);
    const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return false
        } else {
          // docSnap.data() will be undefined in this case
          return true          
        }

  }

  async checkLearningDeck(deckID:string,uid:string){
    const docRef = doc(this.firestore, "/users/"+ uid +"/startedDecks/"+deckID);
    const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return false
        } else {
          return true          
        }

  }

  async checkUser(uid:string){
    const usersRef = doc(this.firestore, "/users/"+uid);
    const docSnap = await getDoc(usersRef);
    return docSnap.exists()
   

  }

  getStartedDecks(uid:string){
    const categoryCollection=collection(this.firestore,"/users/"+ uid +"/startedDecks/")
    return collectionData(categoryCollection)  as Observable<any>;
  }

 addLearningWord(wordID:string,uid:string){
  const learnRef = collection(this.firestore, "/users/"+uid+ "/learningWords");
  const learningWord={
    wordID:wordID,
    learningPercentage:0,
    _sync:Date.now()
  }
  return setDoc(doc(learnRef, wordID),learningWord).then(res=>console.log(res)).catch(err=>console.log("err:"+err))

 }

 addLearningDeck(deckID:string,uid:string){
  const deckRef = collection(this.firestore, "/users/"+uid+ "/startedDecks");
  const learningWord={
    deckID:deckID,
    lastLearningCardIndex:0,
    lastQuizCardIndex:0,
    _sync:Date.now()
  }
  return setDoc(doc(deckRef, deckID),learningWord).then(res=>console.log(res)).catch(err=>console.log("err:"+err))

 }

 updateDeck(deckID:string,uid:string,index:number,type:string){
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
