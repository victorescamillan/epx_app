import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoloPage } from './solo';

@NgModule({
  declarations: [
    SoloPage,
  ],
  imports: [
    IonicPageModule.forChild(SoloPage),
  ],
})
export class SoloPageModule {}
