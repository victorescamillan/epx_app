import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoloDetailsPage } from './solo-details';

@NgModule({
  declarations: [
    SoloDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SoloDetailsPage),
  ],
})
export class SoloDetailsPageModule {}
