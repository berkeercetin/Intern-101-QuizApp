import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, query, setDoc, where } from '@angular/fire/firestore';
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

  addWord(){
    const wordCollection=collection(this.firestore,'words')
    const id =doc(collection(this.firestore, '_')).id;
    const word = {
      categories:[
        "Jlsq6F4ZUzNmzH7dR694"
      ],
      deckID:"irB8upcfWlcrqNcRdjOh",
      example:"We need the synthesize this organic material.",
      explantation:"Farklı maddeleri bir araya getirmek suretiyle yapay bir şekilde oluşum elde etmek",
      pronunciation:"senth'es",
      turkishWordName:"Sentezlemek",
      wordID:id,
      wordName:"Synthesize"

    }
    return setDoc(doc(wordCollection,id), word)
  }
}
