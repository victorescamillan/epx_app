import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
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
  
  constructor(private epxProvider: EpxProvider,public navCtrl: NavController, public navParams: NavParams) {
    let id = navParams.data.data.ID;
    this.loadBusinessDetails(id);  
  }
  loadBusinessDetails(id) {
    this.epxProvider.getBusinessDetails(id).subscribe(data => {
      this.details = data;
      console.log('business details:', this.details);
      this.isLoading = false;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessDetailsPage');
  }

}
