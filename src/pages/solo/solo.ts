import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, Content } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
import { error } from '@firebase/database/dist/esm/src/core/util/util';

@IonicPage()
@Component({
  selector: 'page-solo',
  templateUrl: 'solo.html',
})
export class SoloPage {
  @ViewChild(Content) content: Content;
  soloList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  constructor(
    private events:Events,
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
 
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
    
  }
  //Show badge if there is an update
  ionViewDidEnter(){
    this.epxProvider.getData(this.epxProvider.SOLO_BADGE).then(badge => {
      if (badge != null && badge > 0) {
        this.events.publish(this.epxProvider.SOLO_BADGE,badge);
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SoloPage');
    this.LoadSolo();
  }
  soloDetails(solo) {
    this.navCtrl.push('SoloDetailsPage', { data: solo });
  }
  LoadSolo(refresher?) {
    let url = this.epxProvider.solo_infinite_url;
    let ttl = this.epxProvider.TTL;
    let delay_type = this.epxProvider.DELAY_TYPE;
    let groupKey = 'solo-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if(connected){
      this.epxProvider.getSoloInfinite(this.page).subscribe(data => { //Get data from url/api
        this.totalPage = data.number_of_page;
        let solo = Observable.of(data.data);
        console.log('totalPage',this.totalPage);
        if (refresher) {
          this.cache.loadFromDelayedObservable(url, solo, groupKey, ttl, delay_type).subscribe(data => {
            this.soloList = Object.keys(data).map(key => data[key]);
            refresher.complete();
          });
        }
        else {
          this.cache.loadFromObservable(url, solo, groupKey).subscribe(data => {
            this.soloList = Object.keys(data).map(key => data[key]);
          });
        }
        this.isLoading = false;
        this.isRefresh = true;
        this.epxProvider.updateNotification(this.epxProvider.SOLO_BADGE);
      },error => {
        console.log(error);
        this.epxProvider.toastMessage('Internal Server Error!')
      });
    }
    else{
      this.epxProvider.getData(url).then(data => {
        if(data != null){
          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(data => {
              this.soloList = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.soloList = data;
            });
          }
          this.isLoading = false;
          this.isRefresh = true;
        }
        else{
          console.log('offline data: ', data);
          refresher.complete();
        }
      });
    }
   
  }
  //Pagination
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.epxProvider.getSoloInfinite(this.page + 1).subscribe(data => { //Get data from url/api
      let solo = data.data;
      let temp = Object.keys(solo).map(key => solo[key]);
      for (let i = 0; i < temp.length; i++) {
        this.soloList.push(temp[i]);
        console.log(data[i]);
      }
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
      this.page++;
    },error => {
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.LoadSolo(refresher);
  }
  //Tags
  soloByTags(tag) {
    console.log('tag', tag);
    this.navCtrl.push('SoloTagsPage', { data: tag });
  }
  ionSelected() {
    console.log('solo selected', this.content.scrollTop);
    if(this.content.scrollTop > 100){
      this.content.scrollToTop();
    }
  }
}
