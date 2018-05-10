import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
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
  members: any;
  isLoading: boolean = true;
  constructor(private provider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberMapPage');
    this.loadMap();
  }
  loadMap() {
    this.provider.getMemberMapSearch().subscribe(res => {
      this.members = Object.keys(res).map(key => res[key]);
      let lat = Number(this.members[0].latitude);
      let lng = Number(this.members[0].longitude);
      let mapOptions: GoogleMapOptions = {
        mapType: 'MAP_TYPE_ROADMAP',
        camera: {
          target: {
            lat: lat,
            lng: lng
          },
          zoom: 2,
          tilt: 50,
        }
      };
      this.map = GoogleMaps.create(this.canvass.nativeElement, mapOptions);
      this.members.forEach(item => {
        let lat = Number(item.latitude);
        let lng = Number(item.longitude);
        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready!');
            // Now you can use all methods safely.
            this.map.addMarker({
              title: item.name,
              icon: '#0da2e8',
              snippet: item.Business,
              animation: 'DROP',
              position: {
                lat: lat,
                lng: lng
              }
            }).then(marker => {
              marker.set('member', item),
                marker.on(GoogleMapsEvent.INFO_CLICK)
                  .subscribe(() => {
                    let member = marker.get('member');
                    this.navCtrl.push('MemberDetailsPage', { data: member });
                  });
            });
          },error =>{
            this.provider.toastMessage('Internal error.');
          });
      });

      this.isLoading = false;
    }, error => {
      this.provider.toastMessage('Internal error!');
    })


  }
}
