import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { WordService } from '../../services/word.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-word-cards-deck',
  templateUrl: './word-cards-deck.page.html',
  styleUrls: ['./word-cards-deck.page.scss'],
})
export class WordCardsDeckPage implements OnInit {

  constructor(
    private wordService:WordService,
    private route:ActivatedRoute
  ) { }
  isFlipped: boolean = false;
  selectedAnswer:any
  words:any
  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
  ngOnInit() {
    this.getWords()
  }

  answers=[ "a sıkkı", "b sıkkı", "c sıkkı","d sıkkı"
  ]

  getWords(){
    this.wordService.listWordsbyDeck(this.route.snapshot.params['deckID']).subscribe(res=>{
      console.log(res)
      this.words=res
    })
  }

}
