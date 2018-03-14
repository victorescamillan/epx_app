import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-solo-tags',
  templateUrl: 'solo-tags.html',
})
export class SoloTagsPage {
  tag: any;
  soloList: Observable<any>;
  isLoading: boolean = true;
  isRefresh: boolean = false;

  constructor(private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.tag = navParams.data.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoloTagsPage');
    this.LoadSolo();
  }
  soloDetails(solo) {
    this.navCtrl.push('SoloDetailsPage', { data: solo });
  }
  LoadSolo(refresher?) {
    this.epxProvider.getSoloInfinite(this.tag).subscribe(data => { //Get data from url/api
      var solo = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
      console.log('solo list', solo);
     
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
}
