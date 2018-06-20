import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VaultCategoryPage } from './vault-category';

@NgModule({
  declarations: [
    VaultCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(VaultCategoryPage),
  ],
})
export class VaultCategoryPageModule {}
