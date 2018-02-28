import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser'
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
/**
 * Generated class for the VaultDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vault-details',
  templateUrl: 'vault-details.html',
})
export class VaultDetailsPage {

  details: any;
  isLoading:boolean = true;
  isRefresh:boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public domSanitizer: DomSanitizer,
    public navCtrl: NavController, public navParams: NavParams) {
    var id = navParams.data.data.ID;
    this.LoadDetails(id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultDetailsPage');
  }
  LoadDetails(id) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Loading Details...'
    // });
    // loading.present().then(() => {
      
    // });
    this.epxProvider.getVaultDetails(id).subscribe(data => { //Get data from url/api
      this.details = data;
      // loading.dismiss();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
}
