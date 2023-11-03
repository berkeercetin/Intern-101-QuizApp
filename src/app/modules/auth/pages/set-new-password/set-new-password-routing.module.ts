import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetNewPasswordPage } from './set-new-password.page';

const routes: Routes = [
  {
    path: '',
    component: SetNewPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetNewPasswordPageRoutingModule {}
