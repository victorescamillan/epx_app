import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  member: boolean;
  vault: boolean;
  disable: boolean;
  constructor(private provider: EpxProvider, private events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.provider.getData(this.provider.MEMBER_NOTIFICATION).then(res => {
      if(res != null){
        this.member = res;
      }
    });
    this.provider.getData(this.provider.VAULT_NOTIFICATION).then(res => {
      if(res != null){
        this.vault = res;
      }
    });
    
    if(!this.provider.isConnected()){
      this.provider.toastMessage("Please check your connection.");
      this.disable = true;
      console.log('disable',this.disable);
    }
    else{
      this.disable = false;
      console.log('disable',this.disable);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  updateMember(member){
    if(this.provider.isConnected())
    {
      this.events.publish(this.provider.MEMBER_NOTIFICATION, member);
      
    }
    else{
      this.provider.toastMessage("Can't proceed! Please check your connection.");
      this.disable = true;
    }
  }
  updateVault(vault){
    console.log('vault',vault);
    
    if(this.provider.isConnected())
    {
      this.events.publish(this.provider.VAULT_NOTIFICATION, vault);
    }
    else{
      this.provider.toastMessage("Can't proceed! Please check your connection.");
      this.disable = true;
    }
  }
}
