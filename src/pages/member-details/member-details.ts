import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the MemberDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-details',
  templateUrl: 'member-details.html',
})
export class MemberDetailsPage {
  isLoading: boolean = true;
  details: any;
  member_crews: any;
  current_trips: any;
  past_trips: any;
  hasCrews: boolean = false;
  hasCurrent: boolean = false;
  hasPast: boolean = false;

  constructor(private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log('member details: ', navParams.data);
    var param = navParams.data.data;
    console.log('member id:',param.ID);
    this.loadMemberDetails(param.ID);
  }
  loadMemberDetails(id) {
    this.epxProvider.getMemberDetails(id).subscribe(data => {
      this.details = data;

      var crews = this.details.crews;
      if (crews != null) {
        
        this.member_crews = Object.keys(crews).map(keys => crews[keys]);
        
        if(this.member_crews.length > 0){
          this.hasCrews = true;
        }
        console.log('crews: ', this.member_crews);
      }

      var current = this.details.current_trips;
      if (current != null) {
        this.current_trips = Object.keys(current).map(keys => current[keys]);
        console.log('current trips: ', this.current_trips);
        if(this.current_trips.length > 0){
          this.hasCurrent = true;
        }
      }

      var past = this.details.past_trips;
      if (past != null) {
        this.past_trips = Object.keys(past).map(keys => past[keys]);
        console.log('past trips: ', this.past_trips);
        if(this.past_trips.length > 0){
          this.hasPast = true;
        }
      }
      this.isLoading = false;
    });
  }

  //Navigate to Trip Details
  tripDetails(trip) {
    console.log('trip details:', trip);
    this.navCtrl.push('TripDetailsPage', { data: trip });
  }
  //Navigate to Member Details
  memberDetails(member) {
    console.log('member details:', member);
    this.navCtrl.push('MemberDetailsPage', { data: member });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberDetailsPage');
  }

}
