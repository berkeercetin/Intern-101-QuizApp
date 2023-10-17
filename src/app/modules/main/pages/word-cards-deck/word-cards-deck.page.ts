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
  selectedAnswer:any
  words:any
  isFlipped!: boolean[]  
  subs: Subscription = new Subscription();
  index:any =0
  constructor(
    private wordService:WordService,
    public route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private authService:AuthService
  ) { }
  type="learning"
  ngOnInit() {    
    console.log(this.route.snapshot.params['type'])
    this.getWords()
  }


  flipCard(index: number) {
    this.isFlipped[index] = !this.isFlipped[index];
  }

  async nextCard(){
    if(await this.userService.checkLearningWord(this.words[this.index].wordID, this.authService.isLogged())){
      console.log("if girdi")
      this.userService.addLearningWord(this.words[this.index].wordID,this.authService.isLogged())
    }

    console.log("next: "+this.index)
    
    if (this.index==this.words.length-1){
      
      this.index=0
      console.log("if",this.index)
    }else{
      this.index++
    }

  }

  backCard(){
    if (this.index==0)
    this.index=this.words.length
  else
    this.index--

  }

  getWords(){
    console.log(this.route.snapshot.params['deckID'])
   this.wordService.listWordsbyDeck(this.route.snapshot.params['deckID']).subscribe(res=>{
      console.log(res)
      this.isFlipped = new Array(res.length).fill(false);
      if(res.length==0)
        this.router.navigateByUrl("/main/home")
      this.words=res
    })
  }

  ngOnDestroy(){
  //  this.subs.unsubscribe()
  }
}
