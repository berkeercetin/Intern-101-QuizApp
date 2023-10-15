import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  private firestore: Firestore = inject(Firestore);
  
  listWords(){
    const wordollection=collection(this.firestore,'words')
    return collectionData(wordollection)  as Observable<any>;
  }

  listWordsbyDeck(deckID:string){
    const wordCollection=collection(this.firestore,'words')
    const q = query(wordCollection, where("deckID", "==",deckID));

    return collectionData(q)  as Observable<any>;
  }
}
