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
  totalPage = 0;

  constructor(
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
    this.LoadBusiness();
  }
  LoadBusiness(refresher?) {
    let url = this.epxProvider.business_infinite_url;
    let ttl = this.epxProvider.TTL;
    let delay_type = this.epxProvider.DELAY_TYPE;
    let groupKey = 'business-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if (connected) {
      this.epxProvider.getBusinessInfinite(this.page).subscribe(data => { //Get data from url/api
        let business = Observable.of(data.data);
        this.totalPage = data.number_of_page;
        if (refresher) {
          this.cache.loadFromDelayedObservable(url, business, groupKey, ttl, delay_type).subscribe(data => {
            this.businessList = Object.keys(data).map(key => data[key]);
            console.log('business:', data);
            refresher.complete();
          });
        }
        else {
          this.cache.loadFromObservable(url, business, groupKey).subscribe(data => {
            this.businessList = Object.keys(data).map(key => data[key]);
            console.log('business:', data);
          });
        }
        this.isLoading = false;
        this.isRefresh = true;
      }, error => {
        console.log(error);
        refresher.complete();
      });
    }
    else {
      this.epxProvider.getData(url).then(data => {
        if(data != null){
          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(data => {
              this.businessList = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.businessList = data;
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
  forceReload(refresher) {
    this.LoadBusiness(refresher);
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getBusinessInfinite(this.page + 1).subscribe(data => { //Get data from url/api
      let business = data.data;
      let temp = Object.keys(business).map(key => business[key]);

      for (let i = 0; i < temp.length; i++) {
        this.businessList.push(temp[i]);
        console.log(data[i]);
      }
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
      this.page++;
    }, error => {
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


}
