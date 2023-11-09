import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { medals } from '../../constants/medals';
import { awards } from '../../constants/awards';
import { ModalController } from '@ionic/angular';
import { ScoreboardBadgesComponent } from '../../modals/scoreboard-badges/scoreboard-badges.component';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {
  userData:UserModel = new UserModel({});

  medals = medals;
  awards = awards;
  isMedalOpen = true;

  constructor(private modalController:ModalController) { }
  ngOnInit() {  }


  allMedals() {
    this.modalController.create({
      component: ScoreboardBadgesComponent,
      componentProps: {
          badges: this.medals
      },
      animated: true,
    }).then((modal) => {
      modal.present();
    });

  }

  allAwards() {
    this.modalController.create({
      component: ScoreboardBadgesComponent,
      componentProps: {
          badges: this.awards
      },
      animated: true,
    }).then((modal) => {
      modal.present();
    });

  }

}
