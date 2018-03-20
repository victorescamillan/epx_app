import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  businessList: any;
  temp_businessList: Observable<any>;
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
    this.LoadBusiness();
  }
  LoadBusiness(refresher?) {

    let url = this.epxProvider.business_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'business-list';

    this.epxProvider.getBusinessInfinite(this.page).subscribe(data => { //Get data from url/api

      // var business = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
      this.totalPage = data.number_of_page;
      if (refresher) {
        this.cache.loadFromDelayedObservable(url, Observable.of(data), groupKey,null, delay_type).subscribe(data => {
          this.businessList = Object.keys(data).map(key => data[key]); 
          console.log('business:',data);
          refresher.complete();
        });
      }
      else {
        this.cache.loadFromObservable(url, Observable.of(data), groupKey).subscribe(data => {
          this.businessList = Object.keys(data).map(key => data[key]); 
          console.log('business:',data);
          // this.temp_businessList = Observable.of(data);
        });
      }
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  forceReload(refresher) {
    this.LoadBusiness(refresher);
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;

    this.epxProvider.getBusinessInfinite(this.page).subscribe(data => { //Get data from url/api
      let business = data;
      let temp = Object.keys(business).map(key => business[key]);
      
      for (let i = 0; i < temp.length; i++) {
        this.businessList.push(temp[i]);
        console.log(data[i]);
      }
      
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  filterBusiness(ev: any) {
    if (!this.isLoading) {
      this.businessList = this.temp_businessList;
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.businessList = this.businessList.map((business) => business.filter(function (item) {
          return item.business_name.toLowerCase().includes(val.toLowerCase());
        }));
      }
    }
  }

  businessDetails(business) {
    this.navCtrl.push('BusinessDetailsPage', { data: business });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
  }

}
