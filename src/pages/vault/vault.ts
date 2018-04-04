import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
import { VaultDetailsPage } from '../vault-details/vault-details';
import { DomSanitizer } from '@angular/platform-browser'

@IonicPage()
@Component({
  selector: 'page-vault',
  templateUrl: 'vault.html',
})
export class VaultPage {
  vaultList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(
    private loadingCtrl: LoadingController, private epxProvider: EpxProvider, private cache: CacheService, private navCtrl: NavController) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultPage');
    this.LoadVault();
  }
  vaultDetails(vault) {
    this.navCtrl.push('VaultDetailsPage', { data: vault });
  }
  LoadVault(refresher?) {
    let url = this.epxProvider.vault_infinite_url;
    // let ttl = 1000;
    // let delay_type = 'all';
    let groupKey = 'vault-list';
    this.page = 1;
    this.epxProvider.getVaultInfinite(this.page).subscribe(data => { //Get data from url/api
      let vault = Observable.of(data.vaults);
      this.totalPage = data.number_of_page;
      console.log('vault list', vault);
      if (refresher) {
        this.cache.loadFromDelayedObservable(url, vault, groupKey).subscribe(data => {
          this.vaultList = Object.keys(data).map(key => data[key]);
          refresher.complete();
        });
      }
      else {
        this.cache.loadFromObservable(url, vault, groupKey).subscribe(data => {
          this.vaultList = Object.keys(data).map(key => data[key]);
        });
      }
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.LoadVault(refresher);
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    
    this.epxProvider.getVaultInfinite(this.page + 1).subscribe(data => { //Get data from url/api
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
    });
  }
}
