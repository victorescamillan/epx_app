import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
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

  visibleState = 'visible';
  constructor(

    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    // private googleMaps: GoogleMaps,
    private platform: Platform,
    // public geolocation: Geolocation,
    public navCtrl: NavController, public navParams: NavParams) {
    var details = navParams.data.data;
    this.trip_id = details.ID;
    this.location = details.map_info.map_address;
    this.lat = parseFloat(details.map_info.map_latitude);
    this.lng = parseFloat(details.map_info.map_longitude);
    this.loadTripDetails(this.trip_id);
  }

  //get trip details
  loadTripDetails(id) {
    this.epxProvider.getTripDetails(id).subscribe(data => {
      this.details = data;
      console.log('trip details: ', data);
      
      
      let interested = this.details.whos_interested;
      this.whos_interested = Object.keys(interested).map(key => interested[key]);
      
      let going = this.details.whos_going;
      this.whos_going = Object.keys(going).map(key => going[key]);
    });
  }

  //cordova-plugin-googlemaps
  ionViewDidLoad() {

    this.initMap(this.lat, this.lng, this.location);
    console.log('ionViewDidLoad TripDetailsPage');
  }
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
