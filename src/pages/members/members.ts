import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  memberList: Observable<any>;
  temp_memberList: Observable<any>;
  members:any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
    // this.LoadMembers();
    this.LoadMembersInfinite();
  }

  LoadMembers(refresher?) {
    let url = this.epxProvider.members_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'member-list';

    this.epxProvider.getMembers().subscribe(data => { //Get data from url/api
      this.totalPage = data.number_of_page;
      var members = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration

      if (refresher) {
        this.cache.loadFromDelayedObservable(url, members, groupKey).subscribe(data => {
          this.memberList = Observable.of(data);
          refresher.complete();
          this.page = 0;
        });
      }
      else {
        this.cache.loadFromObservable(url, members, groupKey).subscribe(data => {
          this.memberList = Observable.of(data);
          this.temp_memberList = Observable.of(data);
          // console.log('member list', data);
        });
      }
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  LoadMembersInfinite(refresher?) {
    let url = this.epxProvider.members_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'member-list';

    this.epxProvider.getMembersInfinite(this.page).subscribe(data => { //Get data from url/api
     
      let members = data.members;
      this.totalPage = data.number_of_page;
      //this.members = Object.keys(members).map(key => members[key]); //Convert object to array since angular accepts array for iteration

      //this.memberList = Observable.of(Object.keys(members).map(key => members[key])); //Convert object to array since angular accepts array for iteration
      if (refresher) {
        this.cache.loadFromDelayedObservable(url, Observable.of(members), groupKey,null, delay_type).subscribe(data => {
          this.members = Object.keys(data).map(key => data[key]);
          refresher.complete();
        });
      }
      else {
        this.cache.loadFromObservable(url, Observable.of(members), groupKey).subscribe(data => {
          this.members = Object.keys(data).map(key => data[key]);
          console.log('members:', members);
          this.temp_memberList = data;
        });
      }

      this.isLoading = false;
      this.isRefresh = true;
    });
  }

  forceReload(refresher) {
    // this.LoadMembers(refresher);
    this.LoadMembersInfinite(refresher);
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');

  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;

    this.epxProvider.getMembersInfinite(this.page).subscribe(data => { //Get data from url/api
      let members = data.members;
      let members_temp = Object.keys(members).map(key => members[key]);
      //let new_members = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
      console.log('members',members);
      
      for (let i = 0; i < members_temp.length; i++) {
        this.members.push(members_temp[i]);
        console.log(data[i]);
      }
      
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
