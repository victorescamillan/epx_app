import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripTagsPage } from './trip-tags';

@NgModule({
  declarations: [
    TripTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(TripTagsPage),
  ],
})
export class TripTagsPageModule {}
