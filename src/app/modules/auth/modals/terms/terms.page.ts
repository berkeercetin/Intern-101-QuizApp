import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  @Input() termName: string | undefined;
  @Input() termText: string | undefined;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismiss() {this.modalController.dismiss();}
}
