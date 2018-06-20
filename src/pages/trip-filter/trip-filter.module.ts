import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripFilterPage } from './trip-filter';

@NgModule({
  declarations: [
    TripFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(TripFilterPage),
  ],
})
export class TripFilterPageModule {}
