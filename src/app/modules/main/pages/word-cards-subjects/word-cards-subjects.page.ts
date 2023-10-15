import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable, Subject, toArray } from 'rxjs';
import { DeckService } from '../../services/deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-cards-subjects',
  templateUrl: './word-cards-subjects.page.html',
  styleUrls: ['./word-cards-subjects.page.scss'],
})
export class WordCardsSubjectsPage implements OnInit {
  categories:any
  decks:any
  constructor(
    private categoryService:CategoryService,
    private deckService:DeckService,
    private router:Router
    ) { }

  ngOnInit() {
    this.fetchCategories()
    this.deckService.listDecks().subscribe(res=>{ this.decks=res})
  }

  fetchCategories(){
    this.categoryService.listCategories().subscribe(res=>{ this.categories=res})
  }

   getDecks(categoryID: string) {
     return this.deckService.listDecksbyCategory(categoryID).subscribe(res=>{ return res})
   }

   filterDecks(categoryID:string){
    return this.decks.filter((deck:any) => deck.categoryID==categoryID);
   }

   startDeck(deckID:string){
      this.router.navigateByUrl("/main/word-cards-deck/"+deckID)
   }


}
