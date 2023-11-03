import { WordModel } from "./wordModel";

export class QuestionModel{
    title?: string;
    word?:WordModel
    correctAnswer?:string
    answers?:Set<string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(question?:any){
        this.title=question.title || "";
        this.word=question.word || new WordModel();
        this.correctAnswer=question.correctAnswer || "";
        this.answers=question.answers || new Set();
        return this;
    }
}
