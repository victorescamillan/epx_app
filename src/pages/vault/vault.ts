import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public domSanitizer: DomSanitizer,
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
    this.LoadVault();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultPage');
  }
  vaultDetails(vault) {
    this.navCtrl.push('VaultDetailsPage', { data: vault });
  }
  LoadVault(refresher?) {
    let url = this.epxProvider.vault_url;
    let ttl = 1000;
    let delay_type = 'all';
    let groupKey = 'vault-list';

    this.epxProvider.getVaultInfinite(this.page).subscribe(data => { //Get data from url/api

      //var vault = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
      let vault = data.vaults;
      this.totalPage = data.number_of_page;
      console.log('vault list', vault);

      if (refresher) {
        this.cache.loadFromDelayedObservable(url, Observable.of(vault), groupKey, null, delay_type).subscribe(data =>{
          this.vaultList = Object.keys(data).map(key => data[key]);
          refresher.complete();
        });
      }
      else {
        this.cache.loadFromObservable(url, Observable.of(vault), groupKey).subscribe(data =>{
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
    this.page++;

    this.epxProvider.getVaultInfinite(this.page).subscribe(data => { //Get data from url/api
      let vault = data.vaults;
      let vault_temp = Object.keys(vault).map(key => vault[key]);
      //let new_members = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
      for (let i = 0; i < vault_temp.length; i++) {
        this.vaultList.push(vault_temp[i]);
        console.log(data[i]);
      }
      
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
}
