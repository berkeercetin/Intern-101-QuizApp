export class QuestionModel{
    title?: string;
    correctAnswer?:string
    answers?:Set<string>
    constructor(word:any){
        this.title = word.wordName;
        this.correctAnswer=word.turkishWordName;

        return this;
    }
}





// this.answers.add(this.words[this.index].turkishWordName)
// for (let i = 0; i < 3; i++) {
//   const randomIndex = Math.floor(Math.random() * this.words.length);
//   if (!this.answers.has(this.words[randomIndex].turkishWordName)) {
//     this.answers.add(this.words[randomIndex].turkishWordName)
//   }
// }