import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';

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
    private epxProvider: EpxProvider,
    // private googleMaps: GoogleMaps,
    // public geolocation: Geolocation,
    public navCtrl: NavController, public navParams: NavParams) {
    this.partial_details = navParams.data.data;
    console.log('trip param:', navParams.data.data);
  }
  ionViewDidLoad() {
    this.loadTripDetails(this.partial_details.ID);
    console.log('ionViewDidLoad TripDetailsPage');
  }

  // ionViewWillUnload(){
  //   this.epxProvider.removeData('trip_details');
  // }
  memberDetails(data) {
    this.navCtrl.push('MemberDetailsPage', { data: data });
  }
  memberDetailsCoordinator(member) {
    let data = {
      ID: member.ID,
      member_since: member.Trip_coordinator_Member_since,
      avatar: member.Trip_coordinator_avatar,
      business_model: member.Trip_coordinator_business_model,
      business_url: member.Trip_coordinator_business_url,
      company: member.Trip_coordinator_company,
      employee: member.Trip_coordinator_employee,
      expert_in: member.Trip_coordinator_expert_in,
      help_with: member.Trip_coordinator_can_help_with,
      industry: member.Trip_coordinator_industry,
      name: member.Trip_coordinator_name,
      personal_description: member.Trip_coordinator_personal_description,
      position: member.Trip_coordinator_position,
    };
    console.log('data', data);
    this.navCtrl.push('MemberDetailsPage', { data: data });
  }
  memberDetailsTripLeader(member) {
    let data = {
      ID: member.ID,
      member_since: member.Trip_leader_Member_since,
      avatar: member.Trip_leader_avatar,
      business_model: member.Trip_leader_business_model,
      business_url: member.Trip_leader_business_url,
      company: member.Trip_leader_company,
      employee: member.Trip_leader_employee,
      expert_in: member.Trip_leader_expert_in,
      help_with: member.Trip_leader_can_help_with,
      industry: member.Trip_leader_industry,
      name: member.Trip_leader_name,
      personal_description: member.Trip_leader_personal_description,
      position: member.Trip_leader_position,
    };
    console.log('data', member);
    this.navCtrl.push('MemberDetailsPage', { data: data });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.loadTripDetails(refresher);
  }
  //Interested
  interested() {
    this.isTapped = true;
    this.epxProvider.getData('ID').then(user_id => {
      console.log('interest id', this.partial_details.ID);
      this.epxProvider.getTripInterest(this.partial_details.ID, user_id).subscribe(res => {
        this.navParams.data.trip.trip_interested.interested = res.interest; //Update the trip status from previous page
        this.partial_details.isInterested = res.interest; //Update the trip status in current page
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

    // var marker = new google.maps.Marker({
    //   position: position,
    //   map: this.map,
    //   title: location
    // });

    this.map.setCenter(position);
  }
}
