import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberMapPage } from './member-map';

@NgModule({
  declarations: [
    MemberMapPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberMapPage),
  ],
})
export class MemberMapPageModule {}
