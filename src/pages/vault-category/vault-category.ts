import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the VaultCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vault-category',
  templateUrl: 'vault-category.html',
})
export class VaultCategoryPage {
  category: any;
  vaultList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  totalPage = 0;

  constructor(
    private platform: Platform,
    private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log('data:', navParams.data);
    this.category = navParams.data.data;
  }
  ionViewWillEnter(){
    let backAction = this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      backAction();
    },2);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultCategoryPage');
    this.LoadVault();
  }
  LoadVault() {
    this.epxProvider.getVaultCategory(this.category).subscribe(data => { //Get data from url/api
      this.totalPage = data.number_of_page;
      this.vaultList = data.vaults;
      console.log('vault list', this.vaultList);
      this.isLoading = false;
      this.isRefresh = true;
    },error => {
      console.log(error);
    });
  }
  vaultDetails(vault) {
    this.navCtrl.push('VaultDetailsPage', { data: vault });
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getVaultCategory(this.page + 1).subscribe(data => { //Get data from url/api
      let vault = data.vaults;
      let temp = Object.keys(vault).map(key => vault[key]);
      for (let i = 0; i < temp.length; i++) {
        this.vaultList.push(temp[i]);
      }
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
      this.page++;
      console.log('current page: ', this.page);
    },error => {
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
}
