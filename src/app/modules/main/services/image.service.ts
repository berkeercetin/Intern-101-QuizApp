import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage, StorageReference, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);



 constructor() {}

    async uploadFile(file: File, path: string) {

      const substrType = file.type.split('/')[0];
      const pathWithTypeAndName = `${path}/${substrType}/${file.name}`;
      const storageRef: StorageReference = ref(this.storage, pathWithTypeAndName);
      try {
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);
      return downloadURL;
      } catch (error) {
        throw new Error( typeof error === 'string' ? error : 'An error occured while uploading file');
      }

    }
  }
