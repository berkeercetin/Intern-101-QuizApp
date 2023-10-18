import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { WordService } from '../../services/word.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-word-cards-deck',
  templateUrl: './word-cards-deck.page.html',
  styleUrls: ['./word-cards-deck.page.scss'],
})
export class WordCardsDeckPage implements OnInit {
  selectedAnswer: any
  words!: any[]
  isFlipped!: boolean[]
  subs: Subscription = new Subscription();
  index: any = 0
  question: any;
  answers: Set<string> = new Set();
  constructor(
    private wordService: WordService,
    public route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }
  type = this.route.snapshot.params['type']
  ngOnInit() {
    console.log(this.route.snapshot.params['type'])
    this.getWords()




  }


  flipCard(index: number) {
    this.isFlipped[index] = !this.isFlipped[index];
  }

  generateQuestion() {
    //this.question = `Kelimenin İngilizcesi nedir: ${this.words[this.index].turkishWordName}?`
    this.answers.clear()
    this.answers.add(this.words[this.index].turkishWordName)
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * this.words.length);
      console.log(randomIndex)
      if (!this.answers.has(this.words[randomIndex].turkishWordName)) {
        this.answers.add(this.words[randomIndex].turkishWordName)
      }

    }
  }

  checkAnswer() {
    console.log(this.words[this.index].wordName)
    if (this.selectedAnswer == this.words[this.index].turkishWordName) {
      console.log("dogru")
    }
    else {
      console.log("yanlıs")
    }
  }

  async nextCard() {
    if (this.type == "learning") {
      if (await this.userService.checkLearningWord(this.words[this.index].wordID, this.authService.isLogged())) {
        this.userService.addLearningWord(this.words[this.index].wordID, this.authService.isLogged())
      }
      if (this.type == "quiz") {
        this.generateQuestion()
      }
    }

    console.log("next: " + this.index)

    if (this.index == this.words.length - 1) {

      this.index = 0
      console.log("if", this.index)
    } else {
      this.index++
    }

  }

  backCard() {
    if (this.index == 0)
      this.index = this.words.length
    else
      this.index--

  }

  getWords() {
    console.log(this.route.snapshot.params['deckID'])
    this.wordService.listWordsbyDeck(this.route.snapshot.params['deckID']).subscribe(res => {
      console.log(res)
      this.isFlipped = new Array(res.length).fill(false);
      this.words = res
      if (this.type == "quiz") {
        this.generateQuestion()
      }
      if (res.length == 0)
        //this.router.navigateByUrl("/main/home")
        this.words = res
    })
  }

  ngOnDestroy() {
    //  this.subs.unsubscribe()
  }
}
