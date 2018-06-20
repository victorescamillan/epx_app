import { Component, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController, Content, Events, Platform } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CacheService } from 'ionic-cache';

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {

  // @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild(Content) content: Content;
  @ViewChild('filter') filter: any;
  oldScrollTop = 0;
  // @ViewChild('fab') fab: ElementRef;

  doughnutChart: any;
  tripList: any;
  temp_data: any;
  selectedTrips;
  is_interested: boolean = false;
  id: any;
  date: string = new Date().toLocaleString();
  isLoading: boolean = true;
  isRefresh: boolean = false;
  isInterested: boolean = false;
  page = 1;
  totalPage = 0;

  regionList: any;
  product_typeList: any;
  region: any;
  type: any;
  isFilter: boolean = false;
  topDistance: Number;
  constructor(
    private platform : Platform,
    private renderer: Renderer2,
    private events: Events,
    private cache: CacheService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private epxProvider: EpxProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripsPage');
    this.LoadTrips();
    this.initFilterData();
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Exit',
      message: "Do you want to exit the app?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Okay',
          handler: data => {
            console.log('Saved clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
    prompt.present();
  }
  //Filter Page
  showFilter() {
    // let assist = this.modalCtrl.create('AssistPage',{isNotification:true});
    // assist.present();
    // this.content.scrollToTop();
    this.navCtrl.parent.select(3);
  }
  initFilterData() {
    this.region = '';
    this.type = '';
    this.epxProvider.getTripRegionAndType().subscribe(res => {
      console.log('product type', res.product_cat);
      this.product_typeList = res.product_cat;
      console.log('product region', res.product_region);
      this.regionList = res.product_region;
    });
  }
  scrollFunction() {
    console.log('scrollFunction');
  }
  filterTrips() {
    console.log('region and type:', this.region, this.type);
    if (this.region === '' && this.type === '' || this.region === undefined && this.type === undefined) {
      this.epxProvider.toastMessage('Please select region or trip type.')
      return;
    }
    this.isFilter = true;
    this.isLoading = true;
    this.isRefresh = false;
    this.epxProvider.getData('ID').then(user_id => {
      this.epxProvider.getTripFilter(user_id, this.type, this.region).subscribe(res => {
        console.log('filter result: ', res);
        if (res.result === true) {
          let trips: string[] = Object.keys(res.data).map(key => res.data[key]);
          this.tripList = trips;
        }
        else {
          this.epxProvider.toastMessage('No results found!');
        }
        this.isLoading = false;
      }, error => {
        console.log('error: ', error);
        this.epxProvider.toastMessage('Internal error!');
        this.isLoading = false;
      });
      setTimeout(() => {
        this.isLoading = false
      }, 20000);
    });
  }
  logoutUser() {
    this.epxProvider.clearUser();
    this.navCtrl.setRoot('LoginPage');
  }
  tripByTags(tag) {
    console.log('tag', tag);
    this.navCtrl.push('TripTagsPage', { data: tag });
  }
  //Get Trips List and show indicator
  LoadTrips(refresher?) {
    let url = this.epxProvider.trips_infinite_url;
    let ttl = this.epxProvider.TTL;
    let delay_type = this.epxProvider.DELAY_TYPE;
    let groupKey = 'trip-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if (connected) {
      this.epxProvider.getData('ID').then(user_id => { //Get user id from local storage
        this.epxProvider.getTripsInfinite(user_id, this.page, this.epxProvider.PAGE_SIZE10).subscribe(res => { //Get data from server
          console.log('getTripsInfinite', res.data);
          this.totalPage = res.number_of_page;
          let trips = Observable.of(res.data);
          if (refresher) {
            this.initFilterData();
            this.cache.loadFromDelayedObservable(url, trips, groupKey, ttl, delay_type).subscribe(data => {
              this.tripList = Object.keys(data).map(key => data[key]);
              refresher.complete();
              this.isFilter = false;
            });
          }
          else {
            this.cache.loadFromDelayedObservable(url, trips, groupKey, ttl, delay_type).subscribe(data => {
              this.tripList = Object.keys(data).map(key => data[key]);
            });
          }
          this.isLoading = false;
          this.isRefresh = true;
          this.isInterested = false;
          this.epxProvider.updateNotification(this.epxProvider.TRIP_BADGE);
        }, error => {
          console.log(error);
          this.epxProvider.toastMessage('Trips Internal Error!')
          this.isLoading = false;
        });
      });
    }
    else {
      this.epxProvider.getData(url).then(data => { //Get data from local
        if (data != null) {

          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(data => {
              this.tripList = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.tripList = data;
            });
          }
          this.isLoading = false;
          this.isRefresh = true;
          this.isInterested = false;
        }
        else {
          console.log('offline data: ', data);
        }
      });
    }
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.LoadTrips(refresher);
  }
  //Interested
  interested(trip) {
    this.epxProvider.getData('ID').then(user_id => {
      trip.trip_interested.isTapped = true;
      this.epxProvider.getTripInterest(trip.ID, user_id).subscribe(res => {
        trip.trip_interested.interested = res.interest;
        trip.trip_interested.isTapped = false;
        console.log('interest result:', res);
      });
    });
  }
  //Show badge if there is an update
  ionViewDidEnter() {
    this.epxProvider.getData(this.epxProvider.TRIP_BADGE).then(badge => {
      if (badge != null && badge > 0) {
        this.events.publish(this.epxProvider.TRIP_BADGE, badge);
      }
    });
  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  //Navigate to Trip Details
  tripDetails(trip) {
    console.log('trip data', trip);
    let data = {
      ID: trip.ID,
      isInterested: trip.trip_interested.interested,
      sashes_image: trip.sashes_image,
      location: trip.map_info.map_address,
      lat: Number(trip.map_info.map_latitude),
      lng: Number(trip.map_info.map_longitude),
      product_cat: trip.product_cat,
      title: trip.title,
      trip_gallery: trip.trip_gallery,
      full_content: trip.full_content
    }

    this.navCtrl.push('TripDetailsPage', { data: data, trip: trip });
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getData('ID').then(user_id => { //Get user id from local storage
      this.epxProvider.getTripsInfinite(user_id, this.page + 1, this.epxProvider.PAGE_SIZE10).subscribe(data => { //Get data from url/api
        let trips = data.data;
        let temp = Object.keys(trips).map(key => trips[key]);
        for (let i = 0; i < temp.length; i++) {
          this.tripList.push(temp[i]);
        }
        this.isLoading = false;
        this.isRefresh = true;
        infiniteScroll.complete();
        this.page++;
        console.log('current page: ', this.page);
      }, error => {
        this.isLoading = false;
        this.isRefresh = true;
        infiniteScroll.complete();
      });
    });
  }
  ionSelected() {
    console.log('trip selected');
    this.topDistance = this.content.getContentDimensions().scrollTop;
    console.log('scroll top', this.topDistance);
    if (this.topDistance > 10) {
      this.content.scrollToTop();
    }
  }
  onScroll(event) {
    console.log('filter', this.filter);
    if (event.scrollTop - this.oldScrollTop > 10) {
      // if(className != 'filter hide-filter'){
      //   this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
      // }
      this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
      console.log('scroll down', event.scrollTop - this.oldScrollTop)
    }
    else if (event.scrollTop - this.oldScrollTop < 0) {
      // if(className != 'filter'){
      //   this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
      // }
      this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
      console.log('scroll up', event.scrollTop - this.oldScrollTop)
    }
    this.oldScrollTop = event.scrollTop;
  }
}