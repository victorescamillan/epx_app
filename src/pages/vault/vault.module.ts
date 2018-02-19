import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VaultPage } from './vault';

@NgModule({
  declarations: [
    VaultPage,
  ],
  imports: [
    IonicPageModule.forChild(VaultPage),
  ],
})
export class VaultPageModule {}
