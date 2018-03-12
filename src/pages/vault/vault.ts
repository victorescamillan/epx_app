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
  vaultList: Observable<any>;
  isLoading: boolean = true;
  isRefresh: boolean = false;
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

    this.epxProvider.getVault().subscribe(data => { //Get data from url/api

      var vault = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration

      console.log('vault list', vault);

      if (refresher) {
        this.vaultList = this.cache.loadFromDelayedObservable(url, vault, groupKey, null, delay_type);
        this.vaultList.subscribe(data => {
          refresher.complete();
        });
      }
      else {
        this.vaultList = this.cache.loadFromObservable(url, vault, groupKey);
      }
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  //Pull to refresh page
  forceReload(refresher) {
    this.LoadVault(refresher);
  }
}
