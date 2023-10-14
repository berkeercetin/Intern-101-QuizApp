import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TermsPage } from '../../modals/terms/terms.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TermsPage,
      backdropDismiss: false,
      componentProps: {
        'termName': "Kullanım Koşulları,",
        'termText': "Lorem ipsum sit dolor amet",
      }
    });
    return await modal.present();
  }

}
