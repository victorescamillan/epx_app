import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events } from 'ionic-angular';
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
    private events: Events,
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
    let ttl = 60 * 60 * 12;
    let delay_type = 'all';
    let groupKey = 'vault-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if (connected) {
      this.epxProvider.getVaultInfinite(this.epxProvider.PAGE_SIZE, this.page).subscribe(data => { //Get data from url/api
        let vault = Observable.of(data.vaults);
        this.totalPage = data.number_of_page;
        console.log('vault list', vault);
        if (refresher) {
          this.cache.loadFromDelayedObservable(url, vault, groupKey, ttl, delay_type).subscribe(data => {
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
        this.epxProvider.updateNotification(this.epxProvider.VAULT_BADGE);
      }, error => {
        console.log(error);
        refresher.complete();
      });
    }
    else {
      this.epxProvider.getData(url).then(data => {
        if(data != null){
          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(data => {
              this.vaultList = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.vaultList = data;
            });
          }
          this.isLoading = false;
          this.isRefresh = true;
        }
        else{
          console.log('offline data: ', data);
        }
      });
    }
  }
  //Show badge if there is an update
  ionViewDidEnter() {
    this.epxProvider.getData(this.epxProvider.VAULT_BADGE).then(badge => {
      if (badge != null && badge > 0) {
        this.events.publish(this.epxProvider.VAULT_BADGE,badge);
      }
    });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.LoadVault(refresher);
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getVaultInfinite(this.epxProvider.PAGE_SIZE,this.page + 1).subscribe(data => { //Get data from url/api
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
    }, error => {
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
}
