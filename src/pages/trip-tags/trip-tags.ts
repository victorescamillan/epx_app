import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';


@IonicPage()
@Component({
  selector: 'page-trip-tags',
  templateUrl: 'trip-tags.html',
})
export class TripTagsPage {
  isLoading: boolean = true;
  isRefresh: boolean = false;
  isInterested: boolean = false;
  tag: any;
  tripList: Observable<any>;
  constructor(
    private cache: CacheService,
    private epxProvider: EpxProvider,
    public navCtrl: NavController, public navParams: NavParams) {
      this.tag = navParams.data.data;
      console.log('tag:',this.tag);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripTagsPage');
    this.LoadTrips(this.tag);
  }
  LoadTrips(tag,refresher?) {
    let url = this.epxProvider.trips_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'trip-list';
    this.epxProvider.getData('ID').then(id => {
      console.log('user id:', id);
      this.epxProvider.getTripTags(tag,id).subscribe(data => { //Get data from url/api
     
        // let trips = Observable.of(Object.keys(data).map(key => data[key]));
        this.tripList = Observable.of(data);
        console.log('trips by tag:', this.tripList);
        // if (refresher) {
        //   this.cache.loadFromDelayedObservable(url, trips, groupKey, null, delay_type).subscribe(data => {
        //     this.tripList = Observable.of(data);
        //     refresher.complete();
        //   });
        // }
        // else {
        //   this.cache.loadFromObservable(url, trips, groupKey).subscribe(data => {
        //     this.tripList = Observable.of(data);
        //   });
        // }
        
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
  tripDetails(trip) {
    // this.trip = trip;
    this.navCtrl.push('TripDetailsPage', { data: trip });
  }
}
