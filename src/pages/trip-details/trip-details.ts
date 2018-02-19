import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
 } from '@ionic-native/google-maps';

/**
 * Generated class for the TripDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



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
  
  map: GoogleMap;
  // start = 'chicago, il';
  // end = 'chicago, il';
  // directionsService = new google.maps.DirectionsService;
  // directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    private googleMaps: GoogleMaps,
    private platform: Platform,
    // public geolocation: Geolocation,
    public navCtrl: NavController, public navParams: NavParams) {
    
    this.details = navParams.data;
    this.map_info = this.details.data.map_info;
    this.trip_leader = this.details.data.trip_leader;
    let interested = this.details.data.whos_interested;
    this.whos_interested = Object.keys(interested).map(key => interested[key]);

    let going = this.details.data.whos_going;
    this.whos_going = Object.keys(going).map(key => going[key]);
 
  }
 //cordova-plugin-googlemaps
  ionViewDidLoad() {
    let lat = Number(this.map_info.map_latitude);
    
    let long = Number(this.map_info.map_longitude);
    let location = this.details.data.Start_location;
    console.log(lat,long);
    console.log('ionViewDidLoad TripDetailsPage');
    // this.initMap(lat,long);
    this.loadMap(lat,long,location);
  }
  loadMap(lat_value,long_value,location) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: lat_value,
          lng: long_value
        },
        zoom: 10,
        tilt: 30,

      }
    };
    
    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: location,
            icon: 'green',
            animation: 'DROP',
            position: {
              lat: lat_value,
              lng: long_value
            }
          })
          // .then(marker => {
          //   marker.on(GoogleMapsEvent.MARKER_CLICK)
          //     .subscribe(() => {
          //       alert('clicked');
          //     });
          // });

      });
  }
}
