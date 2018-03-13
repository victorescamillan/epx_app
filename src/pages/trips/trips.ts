import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  doughnutChart: any;
  tripList: Observable<any>;
  trip: any;
  selectedTrips;
  is_interested: boolean = false;
  id: any;
  date: string = new Date().toLocaleString();
  isLoading: boolean = true;
  isRefresh: boolean = false;
  isInterested: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private cache: CacheService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    // cache.setOfflineInvalidate(false);
  }

  
  //Filter Page
  showFilter() {
    let filterModal = this.modalCtrl.create('TripFilterPage');
    filterModal.present();
  }

  logoutUser() {
    this.epxProvider.clearUser();
    this.navCtrl.setRoot('LoginPage');
  }
  tripByTags(tag){
    console.log('tag',tag);
    this.navCtrl.push('TripTagsPage',{data: tag});
  }
  
  //Get Trips List and show indicator
  LoadTrips(refresher?) {
    let url = this.epxProvider.trips_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'trip-list';

    this.epxProvider.getData('ID').then(user_id => { //Get user id from local storage
      this.epxProvider.getTrips(user_id).subscribe(data => { //Get data from url/api

        let trips = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration

        if (refresher) {
          this.cache.loadFromDelayedObservable(url, trips, groupKey, null, delay_type).subscribe(data => {
            this.tripList = Observable.of(data);
            refresher.complete();
          });
        }
        else {
          this.cache.loadFromObservable(url, trips, groupKey).subscribe(data => {
            this.tripList = Observable.of(data);
          });
        }
        
        this.isLoading = false;
        this.isRefresh = true;
        this.isInterested = false;
      });
    });
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
    this.trip = trip;
    this.navCtrl.push('TripDetailsPage', { data: trip });
  }
  // ionViewWillLeave(){
  //   // console.log('trip',this.trip);
  //   this.epxProvider.getTripDetails(this.trip.ID).subscribe(data => {
  //     this.epxProvider.saveData('trip_details',data);
  //   });
  // }
}
