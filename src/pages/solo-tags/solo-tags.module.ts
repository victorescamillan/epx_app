import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoloTagsPage } from './solo-tags';

@NgModule({
  declarations: [
    SoloTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(SoloTagsPage),
  ],
})
export class SoloTagsPageModule {}
