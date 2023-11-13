import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePhoneNumberPage } from './update-phone-number.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePhoneNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePhoneNumberPageRoutingModule {}
