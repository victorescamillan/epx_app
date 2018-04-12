import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController, Content, InfiniteScroll, Events } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
import { Chart } from 'chart.js';
import { error } from '@firebase/database/dist/esm/src/core/util/util';

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild(Content) content: Content;
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
  constructor(private detectorRef: ChangeDetectorRef, private events: Events, private cache: CacheService, public alertCtrl: AlertController, private toastCtrl: ToastController, public modalCtrl: ModalController, private loadingCtrl: LoadingController, private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
    
  }

  //Filter Page
  showFilter() {
    // let filterModal = this.modalCtrl.create('TripFilterPage');
    // filterModal.present();
    this.content.scrollToTop();
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
    let ttl = 60 * 60 * 12;
    let delay_type = 'all';
    let groupKey = 'trip-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if (connected) {
      this.epxProvider.getData('ID').then(user_id => { //Get user id from local storage
        this.epxProvider.getTripsInfinite(user_id, this.page).subscribe(data => { //Get data from server
          this.totalPage = data.number_of_page;
          let trips = Observable.of(data.data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, trips, groupKey, ttl, delay_type).subscribe(data => {
              this.tripList = Object.keys(data).map(key => data[key]);
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, trips, groupKey).subscribe(data => {
              this.tripList = Object.keys(data).map(key => data[key]);
            });
          }
          this.isLoading = false;
          this.isRefresh = true;
          this.isInterested = false;
          this.epxProvider.updateTripNotification(this.epxProvider.TRIP_BADGE);
        }, error => {
          console.log(error);
          refresher.complete();
        });
      });
    }
    else {
      this.epxProvider.getData(url).then(data => { //Get data from local
        if (data != null) {

          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(data => {
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

  loadChart() {
    console.log('load chart: ', this.doughnutCanvas);
    // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    //   type: 'doughnut',
    //   rotation: 5,
    //   data: {
    //     labels: ["Occupied", "Vacant"],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [30,5],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.9)',
    //         'rgba(54, 162, 235, 0.2)',
    //         // 'rgba(255, 206, 86, 0.2)',
    //         // 'rgba(75, 192, 192, 0.2)',
    //         // 'rgba(153, 102, 255, 0.2)',
    //         // 'rgba(255, 159, 64, 0.2)'
    //       ],
    //       hoverBackgroundColor: [
    //         "#FF6384",
    //         "#36A2EB",
    //         // "#FFCE56",
    //         // "#FF6384",
    //         // "#36A2EB",
    //         // "#FFCE56"
    //       ],

    //     }]
    //   }
    // });
  }
  //Interested
  interested(trip) {
    this.epxProvider.getData('ID').then(user_id => {
      if (trip.trip_interested.interested) {
        trip.trip_interested.interested = false;
      }
      else {
        trip.trip_interested.interested = true;
      }
      this.epxProvider.getTripInterest(trip.ID, user_id).subscribe(res => {
        trip.trip_interested.interested = res.interest;
        console.log('interest result:', res);
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripsPage');
    this.LoadTrips();
  }
  ionViewDidEnter() {
    this.epxProvider.getData(this.epxProvider.TRIP_BADGE).then(badge => {
      if (badge != null && badge > 0) {
        this.events.publish(this.epxProvider.TRIP_BADGE,badge);
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
    //this.trip = trip;
    this.navCtrl.push('TripDetailsPage', { data: trip });
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getData('ID').then(user_id => { //Get user id from local storage
      this.epxProvider.getTripsInfinite(user_id, this.page + 1).subscribe(data => { //Get data from url/api
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
}