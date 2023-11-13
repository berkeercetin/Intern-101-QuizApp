import { Injectable, inject } from '@angular/core';
import { Auth, PhoneAuthProvider, RecaptchaParameters, RecaptchaVerifier, UserProfile, signInWithEmailAndPassword, signInWithPhoneNumber, updatePhoneNumber, updateProfile } from '@angular/fire/auth';
import { CollectionReference,updateDoc,collectionData , Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private global: GlobalService = inject(GlobalService);


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

 async setProfileData(data:any,uid:string){
  const userRef = collection(this.firestore, "/users/");
  return await updateDoc(doc(userRef,uid), data)
  .then(() => {
    updateProfile(this.auth.currentUser!, {
      displayName: data.name,
      photoURL: data.profilePhotoURL
    })
  }).catch((err) => { throw new Error(err) })
}



async updatePhoneNumber(phoneNumber:string, verificationCode:string, countryCode = 90 ){
  const recaptchaParameters:RecaptchaParameters = { size:"invisible" }
  const applicationVerifier = new RecaptchaVerifier('recaptcha-container',recaptchaParameters,this.auth);
  const provider = new PhoneAuthProvider(this.auth);
  const verificationId = await provider.verifyPhoneNumber( `+${countryCode}${phoneNumber}`, applicationVerifier);
  const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
  try {
    // const user = (await signInWithEmailAndPassword(this.auth, this.auth.currentUser!.email!, "132123")).user
    return await updatePhoneNumber(this.auth.currentUser!, phoneCredential);
  } catch (error) {
   console.log(error) 
  }
}

async sendVerificationCode(phoneNumber:string, countryCode = 90 ){
  const recaptchaParameters:RecaptchaParameters = { size:"invisible" }
  const applicationVerifier = new RecaptchaVerifier('recaptcha-container',recaptchaParameters,this.auth);
  return {confirmationResult: await signInWithPhoneNumber(this.auth, `+${countryCode}${phoneNumber}`, applicationVerifier) , applicationVerifier:applicationVerifier}
}

reCaptchaVerifier(){
  const recaptchaParameters:RecaptchaParameters = { size:"invisible" }
  return new RecaptchaVerifier('recaptcha-container',recaptchaParameters,this.auth);
}



}



