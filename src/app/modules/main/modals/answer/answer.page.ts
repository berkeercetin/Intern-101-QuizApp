import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WordModel } from '../../models/wordModel';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  @Input() status?: boolean ;
  @Input() word!: WordModel ;
  lastStatus?: string=  "";
  constructor(private modalController: ModalController) { }

  ngOnInit() {console.log("AAAAAAA" +this.status)}

  ionViewWillEnter(){
    if (this.status == true) {
      this.lastStatus = "Doğru";
    } else if (this.status == false) {
      this.lastStatus = "Yanlış";
    }
    else {
      this.lastStatus = "Boş";
    }
  }

  
  async dismiss() {this.modalController.dismiss();}

}
