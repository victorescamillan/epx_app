import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';

/**
 * Generated class for the AssistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assist',
  templateUrl: 'assist.html',
})
export class AssistPage {
  mentorList : any;
  isLoading: boolean = true;
  constructor(
    private provider: EpxProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssistPage');
    this.loadMemberAssist();
  }
  loadMemberAssist(refresher?){
    this.provider.getData('ID').then(id => {
      console.log('member_id',id);
      this.provider.getMemberAssist(id).subscribe(res => {
        if(refresher){
          refresher.complete();
        }
        this.mentorList = res.data;
        console.log(this.mentorList);
        this.isLoading = false;
      }, error => {
        this.provider.toastMessage('Internal error!');
        this.isLoading = false;
      });
    })
  }
   //Pull to refresh page
   forceReload(refresher) {
    this.loadMemberAssist(refresher);
  }
}
