import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
  memberList: any;
  temp_memberList: Observable<any>;
  members:any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(
    private events: Events,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
    this.LoadMembers();
  }
  LoadMembers(refresher?) {
    let url = this.epxProvider.member_infinite_url;
    let ttl = 60 * 60 * 12;
    let delay_type = 'all';
    let groupKey = 'member-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if(connected){
      this.epxProvider.getMembersInfinite(this.page).subscribe(data => { //Get data from url/api
        let members = Observable.of(data.members);
        this.totalPage = data.number_of_page;
        if (refresher) {
          this.cache.loadFromDelayedObservable(url, members, groupKey, ttl, delay_type).subscribe(data => {
            this.members = Object.keys(data).map(key => data[key]);
            refresher.complete();
          });
        }
        else {
          this.cache.loadFromObservable(url, members, groupKey).subscribe(data => {
            this.members = Object.keys(data).map(key => data[key]);
            console.log('members:', members);
            this.temp_memberList = data;
          });
        }
        this.isLoading = false;
        this.isRefresh = true;
        this.epxProvider.updateNotification(this.epxProvider.MEMBER_BADGE);
      },error => {
        console.log(error);
        refresher.complete();
      });
    }
    else{
      this.epxProvider.getData(url).then(data => {
        if(data != null){
          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(data => {
              this.memberList = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.memberList = data;
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
 //Show badge if there is an update
 ionViewDidEnter(){
  this.epxProvider.getData(this.epxProvider.MEMBER_BADGE).then(badge => {
    if (badge != null && badge > 0) {
      this.events.publish(this.epxProvider.MEMBER_BADGE,badge);
    }
  });
}
  forceReload(refresher) {
    // this.LoadMembers(refresher);
    this.LoadMembers(refresher);
  }

  filterMembers(ev: any) {
    if (!this.isLoading) {
      this.memberList = this.temp_memberList;
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.memberList = this.memberList.map((member) => member.filter(function (item) {
          return item.name.toLowerCase().includes(val.toLowerCase());
        }));
      }
    }
  }
  memberDetails(member) {
    this.navCtrl.push('MemberDetailsPage', { data: member });
  }
 
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getMembersInfinite(this.page + 1).subscribe(data => { //Get data from url/api
      let members = data.members;
      let temp = Object.keys(members).map(key => members[key]);
      for (let i = 0; i < temp.length; i++) {
        this.members.push(temp[i]);
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
  openBrowser(url){
    console.log('company url:',url);
    window.open(url,"_system");
  }
}
