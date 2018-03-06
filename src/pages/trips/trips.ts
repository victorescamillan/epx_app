import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {

  tripList: Observable<any>;
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
    cache.setOfflineInvalidate(false);

    this.LoadTrips();
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

  //Get Trips List and show indicator
  LoadTrips(refresher?) {
    let url = this.epxProvider.trips_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'trip-list';

    this.epxProvider.getUser('ID').then(user_id => { //Get user id from local storage
      this.epxProvider.getTrips(user_id).subscribe(data => { //Get data from url/api

        let trips = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration

        if (refresher) {

          this.tripList = this.cache.loadFromDelayedObservable(url, trips, groupKey, );
          this.tripList.subscribe(data => {
            refresher.complete();
          });
        }
        else {

          this.tripList = this.cache.loadFromObservable(url, trips, groupKey);
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

  //Navigate to Trip Details
  tripDetails(trip) {
    this.navCtrl.push('TripDetailsPage', { data: trip });
    console.log(trip);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripsPage');

  }
  //Interested
  interested(trip) {
    this.epxProvider.getUser('ID').then(user_id => {
      this.epxProvider.getTripInterest(trip.ID, user_id).subscribe(res => {
        trip.trip_interested.interested = res.interest;
        console.log('interest result:', res);
      });
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

}
