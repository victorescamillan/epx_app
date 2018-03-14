import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the VaultTagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vault-tags',
  templateUrl: 'vault-tags.html',
})
export class VaultTagsPage {
  tag: any;
  vaultList: Observable<any>;
  isLoading: boolean = true;
  isRefresh: boolean = false;

  constructor(private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log('data:', navParams.data);
    this.tag = navParams.data.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultTagsPage');
    this.LoadVault();
  }
  LoadVault() {
    this.epxProvider.getVaultTags(this.tag).subscribe(data => { //Get data from url/api

      this.vaultList = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration

      // console.log('vault list', vault);

      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  vaultDetails(vault) {
    this.navCtrl.push('VaultDetailsPage', { data: vault });
  }
}
