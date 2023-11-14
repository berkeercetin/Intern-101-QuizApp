import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private firestore: Firestore = inject(Firestore);
  
  listDecks(){
    const categoryCollection=collection(this.firestore,'tags')
    return collectionData(categoryCollection)  as Observable<any>;
  }

  listDecksbyCategory(categoryID:string){
    const deckCollection=collection(this.firestore,'tags')
    const q = query(deckCollection, where("categoryID", "==",categoryID),where("type", "==",this.route.snapshot.params['type']));
    return collectionData(q)  as Observable<any>;
  }
  constructor(private route:ActivatedRoute) { }
}
