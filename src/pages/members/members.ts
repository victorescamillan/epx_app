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
  isLoading: boolean = true;
  isRefresh: boolean = false;

  constructor(
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
    this.LoadMembers();
  }

  LoadMembers(refresher?) {

    let url = this.epxProvider.members_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'member-list';

    this.epxProvider.getMembers().subscribe(data => { //Get data from url/api

      var members = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration

      if (refresher) {
        this.cache.loadFromDelayedObservable(url, members, groupKey).subscribe(data => {
          this.memberList = Observable.of(data);
          refresher.complete();
        });
        // this.memberList.subscribe(data => {
        //   refresher.complete();
        // });
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
  forceReload(refresher) {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
  }

}
