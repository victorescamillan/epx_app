import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetLuckyPage } from './get-lucky';

@NgModule({
  declarations: [
    GetLuckyPage,
  ],
  imports: [
    IonicPageModule.forChild(GetLuckyPage),
  ],
})
export class GetLuckyPageModule {}
