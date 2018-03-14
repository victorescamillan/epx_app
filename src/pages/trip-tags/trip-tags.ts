import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';

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
    private epxProvider: EpxProvider,
    public navCtrl: NavController, public navParams: NavParams) {
      this.tag = navParams.data.data;
      console.log('tag:',this.tag);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripTagsPage');
    this.LoadTrips();
  }
  LoadTrips() {
    this.epxProvider.getData('ID').then(id => {
      console.log('user id:', id);
      this.epxProvider.getTripTags(this.tag,id).subscribe(data => { //Get data from url/api
        
        this.tripList = Observable.of(data);
        console.log('trips by tag:', this.tripList);
 
        this.isLoading = false;
        this.isRefresh = true;
        this.isInterested = false;
      });
    });
    
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
