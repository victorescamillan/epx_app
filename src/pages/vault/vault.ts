import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events, Content, AlertController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
import { VaultDetailsPage } from '../vault-details/vault-details';
import { DomSanitizer } from '@angular/platform-browser'
import { error } from '@firebase/database/dist/esm/src/core/util/util';

@IonicPage()
@Component({
  selector: 'page-vault',
  templateUrl: 'vault.html',
})
export class VaultPage {
  @ViewChild(Content) content: Content;
  @ViewChild('filter') filter: ElementRef;
  oldScrollTop = 0;
  vaultList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  skillsList: any;
  categoryList: any;
  skills: string = '';
  category:string = '';
  isFilter: boolean = false;
  constructor(
    private alertCtrl: AlertController,
    private renderer: Renderer2,
    private events: Events,
    private loadingCtrl: LoadingController, 
    private epxProvider: EpxProvider, 
    private cache: CacheService, 
    private navCtrl: NavController) {
    // Set TTL to 12h
    cache.setDefaultTTL(60 * 60 * 12);
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultPage');
    this.LoadVault();
    this.loadSkillsCategory();
  }
  vaultDetails(vault) {
    this.navCtrl.push('VaultDetailsPage', { data: vault });
  }
  LoadVault(refresher?) {
    let url = this.epxProvider.vault_infinite_url;
    let ttl = this.epxProvider.TTL;
    let delay_type = this.epxProvider.DELAY_TYPE;
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
            this.loadSkillsCategory();
            this.isFilter = false;
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
        this.epxProvider.toastMessage('Internal Server Error!')
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
  ionSelected() {
    console.log('vault selected',);
    let topDistance = this.content.getContentDimensions().scrollTop;
    console.log('scroll top', topDistance);
    if(topDistance > 10){
      this.content.scrollToTop();
    }
  }
  loadSkillsCategory(){
    this.skills = '';
    this.category = '';
    this.epxProvider.getVaultSkillsCategory().subscribe(res => {
      console.log('initSkillsCategory',res)
      this.skillsList = res.skills;
      this.categoryList = res.category;
    });
  }
  filterVault(){
    if(this.skills === '' && this.category === '' || this.skills == undefined && this.category == undefined){
      this.epxProvider.toastMessage('Please select skills or category')
      return;
    }
    this.isFilter = true;
    this.isLoading = true;
    this.isRefresh = false;
    this.epxProvider.getVaultFilters(this.skills,this.category).subscribe(res => {
      console.log('getVaultFilters',res);
      this.vaultList = Object.keys(res).map(key => res[key]);
      this.isLoading = false;
    },error =>{
      console.log('error: ',error);
      this.epxProvider.toastMessage('Internal error.')
    })
  }
  onScroll(event) {
    if (event.scrollTop <= 0) {
      this.renderer.removeClass(this.filter.nativeElement, 'overlay');
    }
    else if (event.scrollTop - this.oldScrollTop > 10) {
      this.renderer.addClass(this.filter.nativeElement, 'overlay');
      this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
    }
    else if (event.scrollTop - this.oldScrollTop < 0) {
      this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
    }
    this.oldScrollTop = event.scrollTop;
  }
  searchVault(){
    this.presentPrompt();
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Vault Search',
      inputs: [
        {
          name: 'name',
          placeholder: 'Input name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.isLoading = true;
            this.isRefresh = false;
            this.isFilter = true;
            this.epxProvider.getVaultSearch(data.name).subscribe(res => {
              console.log('search result: ',res);
              this.vaultList = Object.keys(res).map(key => res[key]);
              this.isLoading = false;
            },error => {
              this.epxProvider.toastMessage('Internal error.');
            });
          }
        }
      ]
    });
    alert.present();
  }
}
