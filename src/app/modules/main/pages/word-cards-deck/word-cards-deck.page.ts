import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-cards-deck',
  templateUrl: './word-cards-deck.page.html',
  styleUrls: ['./word-cards-deck.page.scss'],
})
export class WordCardsDeckPage implements OnInit {

  constructor() { }
  isFlipped: boolean = false;
  selectedAnswer:any

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
  ngOnInit() {
  }

  answers=[ "a sıkkı", "b sıkkı", "c sıkkı","d sıkkı"
  ]

}
