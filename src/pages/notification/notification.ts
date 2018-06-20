import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  @ViewChild(Content) content: Content;
  soloList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  constructor(private cache: CacheService, private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.LoadSolo();
  }
  LoadSolo(refresher?) {
    let url = this.epxProvider.member_infinite_url;
    let ttl = this.epxProvider.TTL;
    let delay_type = this.epxProvider.DELAY_TYPE;
    let groupKey = 'solo-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if(connected){
      this.epxProvider.getMembersInfinite(this.page).subscribe(data => { //Get data from url/api
        console.log('data',data);
        this.totalPage = data.number_of_page;
        // let solo = Observable.of(data.data);
        let solo = Observable.of(data.members);
        if (refresher) {
          this.cache.loadFromDelayedObservable(url, solo, groupKey, ttl, delay_type).subscribe(data => {
            this.soloList = Object.keys(data).map(key => data[key]);
            console.log('result',this.soloList);
            refresher.complete();
          });
        }
        else {
          this.cache.loadFromObservable(url, solo, groupKey).subscribe(data => {
            this.soloList = Object.keys(data).map(key => data[key]);
            console.log('result',this.soloList);
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
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getMembersInfinite(this.page + 1).subscribe(data => { //Get data from url/api
      let members = data.members;
      let temp = Object.keys(members).map(key => members[key]);
      for (let i = 0; i < temp.length; i++) {
        this.soloList.push(temp[i]);
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
  ionSelected() {
    console.log('solo selected');
    console.log('scroll top', this.content.scrollTop);
    if(this.content.scrollTop > 100){
      this.content.scrollToTop();
    }
  }
}
