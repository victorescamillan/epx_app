import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VaultTagsPage } from './vault-tags';

@NgModule({
  declarations: [
    VaultTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(VaultTagsPage),
  ],
})
export class VaultTagsPageModule {}
