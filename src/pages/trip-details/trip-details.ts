import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';

// import { trigger, state, style, transition, animate,keyframes } from '@angular/animations'



declare const google;


@IonicPage()
@Component({
  selector: 'page-trip-details',
  templateUrl: 'trip-details.html',
})


export class TripDetailsPage {
  details: any;
  partial_details: any;
  whos_interested: any;
  whos_going: any;
  trip_leader: any;
  map_info: any;
  product_tags: any;
  // map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;

  map: any;

  // trip_id: any;
  // location: string;
  // lat: number;
  // lng: number;
  // product_cat: any;
  // trip_gallery: any;
  // title: string;
  // isInterested: boolean;

  isLoading: boolean = true;
  isTapped: boolean = false;
  visibleState = 'visible';
  // sashes_image: any;
  // gallery_length: number;
  
  constructor(    
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    // private googleMaps: GoogleMaps,
    private platform: Platform,
    // public geolocation: Geolocation,
    public navCtrl: NavController, public navParams: NavParams) {

    this.partial_details = navParams.data.data;
    console.log('trip param:', this.partial_details);

    // this.trip_gallery = details.trip_gallery;
    // this.product_cat = details.product_cat,
    // this.title = details.title;
    // this.trip_id = details.ID;
    // this.isInterested = details.isInterested;
    // this.sashes_image = details.sashes_image;
    // this.location = details.location;
    // this.lat = details.lat;
    // this.lng = details.lng;
    // this.isInterested = details.trip_interested.interested;
    // this.trip_id = details.ID;
    // this.sashes_image = details.sashes_image;
    // this.location = details.map_info.map_address;
    // this.lat = Number(details.map_info.map_latitude);
    // this.lng = Number(details.map_info.map_longitude);
  }
  ionViewDidLoad() {
    this.loadTripDetails(this.partial_details.ID);
    console.log('ionViewDidLoad TripDetailsPage');
  }

  // ionViewWillUnload(){
  //   this.epxProvider.removeData('trip_details');
  // }

  memberDetails(member) {
    this.navCtrl.push('MemberDetailsPage', { data: member });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.loadTripDetails(refresher);
  }
  //Interested
  interested() {
    this.isTapped = true;
    this.epxProvider.getData('ID').then(user_id => {
      this.epxProvider.getTripInterest(this.partial_details.ID, user_id).subscribe(res => {
        this.navParams.data.data.trip_interested.interested = res.interest;
        this.partial_details.isInterested = res.interest;
        this.isTapped = false;
        if (res.interest) {
          this.details.number_of_interested++;
        }
        else {
          this.details.number_of_interested--;
        }
        console.log('interest result:', res);
      });
    });
  }
  //get trip details
  loadTripDetails(refresher?) {
    this.epxProvider.getTripDetails(this.partial_details.ID).subscribe(data => {
      this.details = data;
      console.log('trip details: ', data);
      console.log('trip gallery: ', data.trip_gallery.length);
      // this.gallery_length = Number(data.trip_gallery.length);
      let interested = this.details.whos_interested;
      this.whos_interested = Object.keys(interested).map(key => interested[key]);

      let going = this.details.whos_going;
      this.whos_going = Object.keys(going).map(key => going[key]);

      this.initMap(this.partial_details.lat, this.partial_details.lng, this.partial_details.location);

      this.isLoading = false;
    });
  }
  openBrowser(url) {
    window.open(url, "_system", );
  }
  tripByTags(tag) {
    console.log('tag', tag);
    this.navCtrl.push('TripTagsPage', { data: tag });
  }
  //cordova-plugin-googlemaps

  initMap(lat, long, location) {
    let position = { lat: lat, lng: long }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: position,
      mapTypeId: 'roadmap'
    });

    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: location
    });

    this.map.setCenter(position);
  }
}
