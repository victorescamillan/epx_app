import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
/**
 * Generated class for the BusinessDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-details',
  templateUrl: 'business-details.html',
})
export class BusinessDetailsPage {
  isLoading:boolean = true;
  details: any;
  partial_details: any;
  
  constructor(
    private epxProvider: EpxProvider,public navCtrl: NavController, public navParams: NavParams) {
    // let id = navParams.data.data.ID;
    // this.loadBusinessDetails(id); 
     this.partial_details = navParams.data.data;
    console.log('param', navParams.data.data);
  }
  loadBusinessDetails(id) {
    this.epxProvider.getBusinessDetails(id).subscribe(data => {
      this.details = data;
      console.log('details:', this.details);
      this.isLoading = false;
    },error =>{
      this.epxProvider.toastMessage('Internal error!');
      this.isLoading = false;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailsPage');
    this.loadBusinessDetails(this.partial_details.ID); 
  }
  memberDetails() {
    let data = {
      ID : this.details.ID,
      member_since : this.details.member_since,
      avatar : this.details.avatar,
      business_model : this.details.business_model,
      business_url : this.details.business_url,
      company : this.details.member_company,
      employee : this.details.employee,
      expert_in : this.details.expert_in,
      help_with : this.details.help_with,
      industry : this.details.industry,
      name : this.details.member_name,
      personal_description : this.details.personal_discription,
      position : this.details.member_position,
    };
    console.log('data',this.details);
    this.navCtrl.push('MemberDetailsPage', { data: data });
  }
}
