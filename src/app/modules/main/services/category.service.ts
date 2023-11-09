import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private firestore: Firestore = inject(Firestore);


  listCategories(){
    const categoryCollection=collection(this.firestore,'categories')
    return collectionData(categoryCollection)  as Observable<any>;
  }
  constructor() { }
}
