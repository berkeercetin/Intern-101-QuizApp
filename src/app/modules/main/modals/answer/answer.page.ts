import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WordModel } from '../../models/wordModel';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  @Input() status!: boolean ;
  @Input() word!: WordModel ;

  constructor(private modalController: ModalController) { }

  ngOnInit() {console.log(this.word)}
  
  async dismiss() {this.modalController.dismiss();}

}
