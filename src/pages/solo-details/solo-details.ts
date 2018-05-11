import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the SoloDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const google;
@IonicPage()
@Component({
  selector: 'page-solo-details',
  templateUrl: 'solo-details.html',
})
export class SoloDetailsPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  details: any;
  lat:number;
  lng: number;
  location:string;
  constructor(
    private platform: Platform,
    public navCtrl: NavController, public navParams: NavParams) {
    this.details = navParams.data.data;
    this.lat = Number(this.details.latitude);
    this.lng = Number(this.details.longitude);
    this.location = this.details.address;
    console.log('solo details',this.details);
  }
  ionViewWillEnter(){
    let backAction = this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      backAction();
    },2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoloDetailsPage');
    this.initMap(this.lat, this.lng, this.location);
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
}
