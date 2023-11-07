import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileUpdateModalComponent } from '../../components/profile-update-modal/profile-update-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  options: {
    icon: {
      name: string,
      color: string
    },
    href: string,
    name: string,
  }[] = [
      {
        icon: {
          name: "key",
          color: "#DAA520"
        },
        href: "#",
        name: "Chance Password",
      },
      {
        icon: {
          name: "book",
          color: "#708090"
        },
        href: "#",
        name: "Other Hocha Applications",
      },
      {
        icon: {
          name: "school",
          color: "#2E8B57"
        },
        href: "#",
        name: "My School",
      },
      {
        icon: {
          name: "people",
          color: "#800080"
        },
        href: "#",
        name: "Friends",
      },
      {
        icon: {
          name: "card",
          color: "#008000"
        },
        href: "#",
        name: "Billing and Purchased Products",
      },
      {
        icon: {
          name: "key",
          color: "#DAA520"
        },
        href: "#",
        name: "Chance Password",
      },
      {
        icon: {
          name: "book",
          color: "#708090"
        },
        href: "#",
        name: "Other Hocha Applications",
      },
    ]
  constructor(
    private popoverController: PopoverController,
    public global: GlobalService
  ) { }

  userData?: UserModel;
  ngOnInit() {
    this.global.userSubscription.subscribe(res => {
      this.userData = new UserModel(res)
    })
  }

  openProfileUpdate() {
    this.popoverController.create({
      component: ProfileUpdateModalComponent,
      animated: true,
      backdropDismiss:false,
      cssClass:"mak-popover",
      componentProps: {
        "userID": this.userData?.uid,
        "userData": this.userData
      },
    }).then( res => res.present() )
  }

}

class UserModel {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  uid?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.displayName =  data.displayName || "İsim Bilinmiyor";
    this.email = data.email || "Eposta Bilinmiyor";
    this.phoneNumber = data.phoneNumber || "Telefon Numarası Bilinmiyor";
    this.photoURL = data.photoURL || "https://ionicframework.com/docs/img/demos/avatar.svg";
    this.uid = data.uid
  }
}

