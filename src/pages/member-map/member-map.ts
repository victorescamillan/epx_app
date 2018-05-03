import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-member-map',
  templateUrl: 'member-map.html',
})
export class MemberMapPage {
  @ViewChild('map') canvass: ElementRef;
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberMapPage');
    this.loadMap();
  }
  loadMap() {
    console.log('load map',this.canvass.nativeElement);
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
     };
 
    this.map = GoogleMaps.create(this.canvass.nativeElement, mapOptions);
 
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
         console.log('Map is ready!');
 
         // Now you can use all methods safely.
         this.map.addMarker({
           title: 'Ionic',
           icon: 'blue',
           animation: 'DROP',
           position: {
             lat: 43.0741904,
             lng: -89.3809802
           }
         })
         .then(marker => {
           marker.on(GoogleMapsEvent.MARKER_CLICK)
             .subscribe(() => {
               alert('clicked');
             });
         });
 
      });
   }
}
