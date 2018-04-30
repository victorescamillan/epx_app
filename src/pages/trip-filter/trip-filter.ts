import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';

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
  regionList: any;
  product_typeList: any;
  region: any;
  type: any;
  constructor(
    private provider: EpxProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  closeFilter(){
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripFilterPage');
    this.initFilterData();
  }
  initFilterData(){
    this.provider.getTripRegionAndType().subscribe(res => {
      console.log('product type',res.product_cat);
      this.product_typeList = res.product_cat;
      console.log('product region',res.product_region);
      this.regionList = res.product_region;
    });
  }
  filterTrips(){
    console.log('region', this.region);
    console.log('type', this.type);
  }
}
