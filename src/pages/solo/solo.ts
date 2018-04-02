import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';

@IonicPage()
@Component({
  selector: 'page-solo',
  templateUrl: 'solo.html',
})
export class SoloPage {

  soloList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  constructor(
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
    this.LoadSolo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoloPage');
  }
  soloDetails(solo) {
    this.navCtrl.push('SoloDetailsPage', { data: solo });
  }
  LoadSolo(refresher?) {
    let url = this.epxProvider.solo_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'solo-list';

    this.epxProvider.getSoloInfinite(this.page).subscribe(data => { //Get data from url/api
      //var solo = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
      this.totalPage = data.number_of_page;
      console.log('totalPage',this.totalPage);
      if (refresher) {
        this.cache.loadFromDelayedObservable(url, Observable.of(data), groupKey, null, delay_type).subscribe(data => {
          this.soloList = Object.keys(data).map(key => data[key]);
          refresher.complete();
        });
      }
      else {
        this.cache.loadFromObservable(url, Observable.of(data), groupKey).subscribe(data => {
          this.soloList = Object.keys(data).map(key => data[key]);
          console.log('solo list', this.soloList );
        });
      }
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;

    this.epxProvider.getSoloInfinite(this.page).subscribe(data => { //Get data from url/api
      let solo = data;
      let temp = Object.keys(solo).map(key => solo[key]);

      for (let i = 0; i < temp.length; i++) {
        this.soloList.push(temp[i]);
        console.log(data[i]);
      }

      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }

  //Pull to refresh page
  forceReload(refresher) {
    this.LoadSolo(refresher);
  }
  soloByTags(tag) {
    console.log('tag', tag);
    this.navCtrl.push('SoloTagsPage', { data: tag });
  }
}
