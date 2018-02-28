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
  isLoading:boolean = true;
  isRefresh:boolean = false;
  constructor(
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
      this.LoadSolo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoloPage');
  }
  soloDetails(solo){
    this.navCtrl.push('SoloDetailsPage',{data: solo});
  }
  LoadSolo(refresher?) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Loading Solo...'
    // });
    
    let url = this.epxProvider.solo_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'solo-list';
    // loading.present().then(() => {
      
    // });
    this.epxProvider.getsolo().subscribe(data => { //Get data from url/api
          
      var solo = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration

      console.log('solo list', solo);
      if (refresher) {
        this.soloList = this.cache.loadFromDelayedObservable(url, solo, groupKey, ttl, delay_type);
        this.soloList.subscribe(data => {
          refresher.complete();
        });
      }
      else {
        this.soloList = this.cache.loadFromObservable(url, solo, groupKey, ttl);
      }
      this.isLoading = false;
      this.isRefresh = true;
      // loading.dismiss();
    });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.LoadSolo(refresher);
  }
}
