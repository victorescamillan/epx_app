import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VaultDetailsPage } from './vault-details';

@NgModule({
  declarations: [
    VaultDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VaultDetailsPage),
  ],
})
export class VaultDetailsPageModule {}
