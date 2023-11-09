import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scoreboard-badges',
  templateUrl: './scoreboard-badges.component.html',
  styleUrls: ['./scoreboard-badges.component.scss'],
})
export class ScoreboardBadgesComponent  implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() badges:any;
  constructor(public modal:ModalController) { }

  ngOnInit() {}

}
