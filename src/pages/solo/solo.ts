import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
import { SoloDetailsPage } from '../solo-details/solo-details';

@IonicPage()
@Component({
  selector: 'page-solo',
  templateUrl: 'solo.html',
})
export class SoloPage {

  soloList: Observable<any>;
  isLoading: boolean = true;
  isRefresh: boolean = false;
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

    this.epxProvider.getsolo().subscribe(data => { //Get data from url/api
      var solo = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
      console.log('solo list', solo);
      if (refresher) {
        this.soloList = this.cache.loadFromDelayedObservable(url, solo, groupKey);
        this.soloList.subscribe(data => {
          refresher.complete();
        });
      }
      else {
        this.soloList = this.cache.loadFromObservable(url, solo, groupKey);
      }
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.LoadSolo(refresher);
  }
}
