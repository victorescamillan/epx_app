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
  constructor(private provider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberMapPage');
    this.loadMap();

  }
  loadMap() {
    let mapOptions: GoogleMapOptions = {
      mapType: 'MAP_TYPE_ROADMAP',
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create(this.canvass.nativeElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
        this.provider.getMemberMapSearch().subscribe(res => {
          this.members = Object.keys(res.members).map(key => res.members[key]);
          console.log('members', this.members);
          this.map.addMarker({
            title: this.members.name,
            icon: '#0da2e8',
            snippet: this.members.company,
            animation: 'BOUNCE',
            position: {
              lat: 43.0741904 + Number(this.members.ID),
              lng: -89.3809802
            }
          }).then(marker => {
            marker.set('member_id', this.members.ID),
              marker.on(GoogleMapsEvent.INFO_CLICK)
                .subscribe(() => {
                  //  alert(marker.get('member_id'));
                  let member = { ID: marker.get('member_id') };
                  this.navCtrl.push('MemberDetailsPage', { data: member });
                });
          });
        }, error => {
          this.provider.toastMessage('Internal error!');
        })

      });
  }
}
