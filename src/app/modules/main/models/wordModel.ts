export class WordModel {
    categories?:Array<string>
    deckId?: string ;
    example?: string ;
    explantation?: string ;
    pronunciation?: string ;
    turkishWordName?: string ;
    wordID?: string ;
    wordName?: string ;


   constructor(word?:any){
       this.categories=word.categories || [];
       this.deckId=word.deckId || "";
       this.example=word.example || "";
       this.explantation=word.explantation || "";
       this.pronunciation=word.pronunciation || "";
       this.turkishWordName=word.turkishWordName  || "";
       this.wordID=word.wordID  || "";
       this.wordName=word.wordName || "";
       return this;
   }
}