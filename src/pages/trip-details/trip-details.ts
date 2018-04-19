import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';

// import { trigger, state, style, transition, animate,keyframes } from '@angular/animations'

// import { Geolocation } from '@ionic-native/geolocation';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker,
//   LatLng,
//  } from '@ionic-native/google-maps';

/**
 * Generated class for the TripDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare const google;


@IonicPage()
@Component({
  selector: 'page-trip-details',
  templateUrl: 'trip-details.html',
})


export class TripDetailsPage {
  details: any;
  whos_interested: any;
  whos_going: any;
  trip_leader: any;
  map_info: any;
  product_tags: any;
  // map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;

  map: any;

  trip_id: any;
  location: string;
  lat: number;
  lng: number;
  isLoading: boolean = true;
  isInterested: boolean;
  isTapped: boolean = false;
  visibleState = 'visible';
  sashes_image: any;
  gellery_length: number;
  
  constructor(    
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    // private googleMaps: GoogleMaps,
    private platform: Platform,
    // public geolocation: Geolocation,
    public navCtrl: NavController, public navParams: NavParams) {

    var details = navParams.data.data;
    console.log('trip param:', details);
    
    this.isInterested = details.trip_interested.interested;
    

    this.trip_id = details.ID;
    this.sashes_image = details.sashes_image;
    this.location = details.map_info.map_address;
    this.lat = Number(details.map_info.map_latitude);
    this.lng = Number(details.map_info.map_longitude);
  }
  ionViewDidLoad() {
    this.loadTripDetails(this.trip_id);
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
      this.epxProvider.getTripInterest(this.trip_id, user_id).subscribe(res => {
        this.navParams.data.data.trip_interested.interested = res.interest;
        this.isInterested = res.interest;
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
    this.epxProvider.getTripDetails(this.trip_id).subscribe(data => {
      this.details = data;
      console.log('trip details: ', data);
      console.log('trip gallery: ', data.trip_gallery.length);
      this.gellery_length = Number(data.trip_gallery.length);
      let interested = this.details.whos_interested;
      this.whos_interested = Object.keys(interested).map(key => interested[key]);

      let going = this.details.whos_going;
      this.whos_going = Object.keys(going).map(key => going[key]);

      this.initMap(this.lat, this.lng, this.location);

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


  // loadMap(lat_value,long_value,location) {
  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: lat_value,
  //         lng: long_value
  //       },
  //       zoom: 10,
  //       tilt: 30,

  //     }
  //   };

  //   this.map = this.googleMaps.create('map_canvas', mapOptions);

  //   // Wait the MAP_READY before using any methods.
  //   this.map.one(GoogleMapsEvent.MAP_READY)
  //     .then(() => {
  //       console.log('Map is ready!');

  //       // Now you can use all methods safely.
  //       this.map.addMarker({
  //           title: location,
  //           icon: 'green',
  //           animation: 'DROP',
  //           position: {
  //             lat: lat_value,
  //             lng: long_value
  //           }
  //         })
  //         // .then(marker => {
  //         //   marker.on(GoogleMapsEvent.MARKER_CLICK)
  //         //     .subscribe(() => {
  //         //       alert('clicked');
  //         //     });
  //         // });
  //     });
  // }
}
