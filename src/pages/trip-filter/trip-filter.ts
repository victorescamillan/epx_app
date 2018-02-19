import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';

/**
 * Generated class for the TripFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-filter',
  templateUrl: 'trip-filter.html',
})
export class TripFilterPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  closeFilter(){
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripFilterPage');
  }

}
