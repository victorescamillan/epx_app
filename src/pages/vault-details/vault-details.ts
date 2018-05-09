import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
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
  partial_details: any;
  isLoading: boolean = true;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public domSanitizer: DomSanitizer,
    public navCtrl: NavController, public navParams: NavParams) {
    this.partial_details = navParams.data.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaultDetailsPage');
    this.LoadDetails(this.partial_details.ID);
  }
  openBrowser(url){
    console.log('company url:',url);
    window.open(url,"_system");
  }
  memberDetails(member) {
    this.navCtrl.push('MemberDetailsPage', { data: member });
  }
  vaultByTags(tag){
    console.log('tag',tag);
    this.navCtrl.push('VaultTagsPage',{data: tag});
  }
  vaultByCategory(category){
    this.navCtrl.push('VaultCategoryPage',{data: category});
  }
  LoadDetails(id) {
    this.epxProvider.getVaultDetails(id).subscribe(data => { //Get data from url/api
      this.details = data;
      this.isLoading = false;
      console.log('details', this.details);
    });
  }
  helpfulURL(url){
    if(url == ""){
      this.epxProvider.toastMessage('Invalid URL.');
      return;
    }
    console.log('company url:',url);
    if(this.platform.is('ios')){
      window.open(url,"_system");
    }
    else{
      window.open(url,"_self");
    }
    
  }
}
