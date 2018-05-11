import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-solo-tags',
  templateUrl: 'solo-tags.html',
})
export class SoloTagsPage {
  tag: any;
  soloList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(
    private platform: Platform,
    private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.tag = navParams.data.data;
    console.log('tag',this.tag);
  }
  ionViewWillEnter(){
    let backAction = this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      backAction();
    },2);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SoloTagsPage');
    this.LoadSolo();
  }
  soloDetails(solo) {
    this.navCtrl.push('SoloDetailsPage', { data: solo });
  }
  LoadSolo(refresher?) {
    this.epxProvider.getData('ID').then(user_id => {
      console.log('user id',user_id);
      this.epxProvider.getSoloTags(user_id,this.page,this.tag).subscribe(data => { //Get data from url/api
        //var solo = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
        this.totalPage = data.number_of_page;
        console.log('solo list', data);
        this.soloList = data.data
        this.isLoading = false;
        this.isRefresh = true;
      });
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    this.epxProvider.getData('ID').then(user_id => {
      console.log('user id',user_id);
      this.epxProvider.getSoloTags(user_id,this.page,this.tag).subscribe(data => { //Get data from url/api
        let solo = data.data;
  
        for (let i = 0; i < solo.length; i++) {
          this.soloList.push(solo[i]);
          console.log(solo[i]);
        }
  
        infiniteScroll.complete();
        this.isLoading = false;
        this.isRefresh = true;
      });
    });
  }
}
