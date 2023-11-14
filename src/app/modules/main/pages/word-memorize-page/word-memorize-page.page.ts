import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-memorize-page',
  templateUrl: './word-memorize-page.page.html',
  styleUrls: ['./word-memorize-page.page.scss'],
})
export class WordMemorizePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cards=[
    {
      value:25
    },
    {
      value:50
    },
    {
      value:100
    }
  ]

}
