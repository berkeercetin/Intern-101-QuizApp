import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileUpdateModalComponent } from '../../components/profile-update-modal/profile-update-modal.component';
import { UserModel } from '../../models/user.model';

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
          name: "call",
          color: "#DAA520"
        },
        href: "/main/update-phone-number",
        name: "Chance Phone Number",
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



