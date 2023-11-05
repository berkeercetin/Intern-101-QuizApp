import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WordService } from '../../services/word.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AnswerPage } from '../../modals/answer/answer.page';
import { QuestionModel } from '../../models/Question.model';
import { WordModel } from '../../models/wordModel';

@Component({
  selector: 'app-word-cards-deck',
  templateUrl: './word-cards-deck.page.html',
  styleUrls: ['./word-cards-deck.page.scss'],
})
export class WordCardsDeckPage implements OnInit {

  @ViewChild('nextButton', { static: true }) nextButton!: ElementRef;
  selectedAnswer?: string
  words!: WordModel[]
  isFlipped!: boolean[]
  subs: Subscription = new Subscription();
  index: number = 0
  type = this.route.snapshot.params['type']
  questions:QuestionModel[]=[]
  questionLoading:boolean=false
  constructor(
    private wordService: WordService,
    public route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private modalController: ModalController,
    private alertController:AlertController
  ) { }
    ngOnInit() {
      
    }
  ionViewWillEnter() {
    this.getWords()
  }

  flipCard(index: number) {
    this.isFlipped[index] = !this.isFlipped[index];
  }

  checkAnswer() {
    if (this.selectedAnswer == this.words[this.index].turkishWordName) {
      this.presentModal(true, this.words[this.index])
    }
    else {
      this.presentModal(false, this.words[this.index])
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Tamamladınız !',
      buttons: ['OK'],
    });
    this.router.navigateByUrl('/main/home')
    await alert.present();
  }

  async nextCard() {
    this.userService.updateDeck(this.route.snapshot.params['deckID'], this.authService.isLogged() ||"",this.index,this.type)
    if (this.type == "learning") {
      if (await this.userService.checkLearningWord(this.words[this.index].wordID ||"" , this.authService.isLogged()|| "")) {
        this.userService.addLearningWord(this.words[this.index].wordID || ""  , this.authService.isLogged() || "")
      }
    }
    if (this.index == this.words.length - 1) {
      this.index = 0
      this.presentAlert()
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

  async getWords() {
    this.subs = this.wordService.listWordsbyDeck(this.route.snapshot.params['deckID']).subscribe((res: WordModel[]) => {
      this.isFlipped = new Array(res.length).fill(false);
      this.words = res
      if (this.type == "quiz") {
        this.words.forEach(word => {
          const answers = new Set()
          answers.add(word.turkishWordName)
          let count = 0
          while (count < 3) {
            const randomIndex = Math.floor(Math.random() * this.words.length)
            const randomWord = this.words[randomIndex].turkishWordName
            if (!answers.has(randomWord)) {
              answers.add(randomWord)
              count++
            }
          }
          const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5)
          this.questions.push(new QuestionModel({
            word: word,
            answers: new Set(shuffledAnswers),
            correctAnswer: word.turkishWordName,
            title: word.wordName + 'Kelimesinin Türkçe karşılığı aşağıdakilerden hangisidir ?'
          }))
        })
        this.questionLoading = true
        console.log(this.questions)
      }
    })
  }

  async presentModal(status: boolean, word: WordModel) {
    const modal = await this.modalController.create({
      component: AnswerPage,
      backdropDismiss: false,
      breakpoints: [0, 0.25, 0.5, 0.75],
      initialBreakpoint: 0.25,
      componentProps: {
        'status': status,
        'word': word,
      },
    });
    modal.onDidDismiss()
      .then( () => {
        console.log('Modal dismissed');
      this.nextButton.nativeElement.click();
      });
    return await modal.present();
  }

  ionViewDidLeave() {
    this.subs.unsubscribe()
  }
}
