import { Component, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, Platform } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CacheService } from 'ionic-cache';

@IonicPage()
@Component({
  selector: 'page-solo',
  templateUrl: 'solo.html',
})
export class SoloPage {
  @ViewChild(Content) content: Content;
  @ViewChild('filter') filter: any;
  oldScrollTop = 0;
  soloList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  fromDate: String = new Date().toISOString();
  toDate: String = new Date().toISOString();
  isFilter: boolean = false;
  constructor(
    private platform: Platform,
    private renderer: Renderer2,
    private events:Events,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
 
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
  
  }
  ionViewWillEnter(){
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.parent.select(0);
      backAction();
    },2);
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
            this.isFilter = false;
            this.toDate = new Date().toISOString();
            this.fromDate = new Date().toISOString();
          });
        }
        else {
          this.cache.loadFromDelayedObservable(url, solo, groupKey, ttl, delay_type).subscribe(data => {
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
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(data => {
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
    console.log('solo selected');
    let topDistance = this.content.getContentDimensions().scrollTop;
    console.log('scroll top', topDistance);
    if(topDistance > 10){
      this.content.scrollToTop();
    }
  }
  updateSolo(){
    this.isLoading = true;
    this.isRefresh = false;
    this.isFilter = true;
    let from = new Date(this.fromDate.toString()).toLocaleDateString();
    let to = new Date(this.toDate.toString()).toLocaleDateString();
    console.log('update Solo', from, to);
    this.epxProvider.getSoloFilters(from, to).subscribe(res => {
      console.log('update Solo', res);
      if(res.result === true){
        this.soloList = Object.keys(res.data).map(key => res.data[key]);
      }
      else{
        this.epxProvider.toastMessage('No result found.')
      }
      this.isLoading = false;
    },error =>{
      console.log('error: ',error);
      this.epxProvider.toastMessage('Internal error!');
      this.isLoading = false;
    });
  }
  onScroll(event) {
    if (event.scrollTop - this.oldScrollTop > 10) {
      this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
        console.log('scroll down',event.scrollTop - this.oldScrollTop)
    }
    else if (event.scrollTop - this.oldScrollTop < 0) {
      this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
      console.log('scroll up',event.scrollTop - this.oldScrollTop)
    }
    this.oldScrollTop = event.scrollTop;
  }
}
