import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable, Subject, Subscription, toArray } from 'rxjs';
import { DeckService } from '../../services/deck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-word-cards-subjects',
  templateUrl: './word-cards-subjects.page.html',
  styleUrls: ['./word-cards-subjects.page.scss'],
})
export class WordCardsSubjectsPage implements OnInit {
  categories:any
  decks:any
  subsCategory: Subscription = new Subscription();
  subsDeck: Subscription = new Subscription();
  percentage:any

  constructor(
    private categoryService:CategoryService,
    private deckService:DeckService,
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private authService:AuthService
    ) { }

  ngOnInit() {
    this.fetchCategories()
    this.getDecks();
  }

  fetchCategories(){
    this.subsCategory=this.categoryService.listCategories().subscribe(res=>{ this.categories=res})
  }

   getDecks() {
   this.subsDeck= this.deckService.listDecks().subscribe(res=>{ this.decks=res})
   }

   filterDecks(categoryID:string,){
    return this.decks.filter((deck:any) => deck.categoryID==categoryID )
   }

   async startDeck(deckID:string){
    if (await this.userService.checkLearningDeck (deckID, this.authService.isLogged())) {
      this.userService.addLearningDeck(deckID, this.authService.isLogged())
    }
      this.router.navigateByUrl("/main/word-cards-deck/"+this.route.snapshot.params['type']+"/"+deckID)
   }
   findPercentage(deck:any){
    if(this.route.snapshot.params['type']=="quiz"){
      console.log (deck.lastQuizCardIndex)
    }
    else{

    }

   }

   ngOnDestroy(){
    this.subsCategory.unsubscribe()
    this.subsCategory.unsubscribe()
   }


}
