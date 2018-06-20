import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  member: boolean;
  vault: boolean;
  getLucky: boolean;
  disable: boolean;
  constructor(
    private loadingCtrl: LoadingController,
    private provider: EpxProvider, private events: Events, public navCtrl: NavController, public navParams: NavParams) {

    this.events.subscribe(this.provider.CLOSE_PAGE, value => {
      if(value){
        navCtrl.popToRoot();
      }
    });
    //Disable toggle if no internet connection.
    if (!this.provider.isConnected()) {
      this.provider.toastMessage("Please check your connection.");
      this.disable = true;
    }
    else {
      this.disable = false;
    }
    this.provider.getData('enable_member').then(res => {
      console.log('enable_member', res);
      this.member = res;
    });
    this.provider.getData('enable_vault').then(res => {
      console.log('enable_vault', res);
      this.vault = res;
    });
    this.provider.getData('enable_get_lucky').then(res => {
      console.log('enable_get_lucky', res);
      this.getLucky = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  updateMember(member) {
    console.log('updateMember', member);
    if (this.provider.isConnected()) {
      let loading = this.loadingCtrl.create({ content: 'Loading...' });
      loading.present().then(() => {
        this.provider.getData('ID').then(member_id => {
          this.provider.enableMember(member_id, member).subscribe(res => {
            if (res.result === 'true') {
              this.provider.saveData('enable_member', member);
              this.events.publish(this.provider.MEMBER_NOTIFICATION, member);
            }
            else {
              member = !member;
            }
            loading.dismiss();
          }, error => {
            this.provider.toastMessage('Internal Error!');
            member = !member;
            loading.dismiss();
          })
        });
       
      });
    }
    else {
      this.provider.toastMessage("Can't proceed! Please check your connection.");
      this.disable = true;
    }
  }
  updateVault(vault) {
    console.log('updateVault', vault);
    if (this.provider.isConnected()) {
      let loading = this.loadingCtrl.create({ content: 'Loading...' });
      loading.present().then(() => {
        this.provider.getData('ID').then(member_id => {
          this.provider.enableVault(member_id,vault).subscribe(res => {
            if (res.result === 'true') {
              this.provider.saveData('enable_vault', vault);
              this.events.publish(this.provider.VAULT_NOTIFICATION, vault);
            }
            else {
              vault = !vault;
            }
            loading.dismiss();
          }, error => {
            this.provider.toastMessage('Internal Error!');
            vault = !vault;
            loading.dismiss();
          })
        });
      
      });
    }
    else {
      this.provider.toastMessage("Can't proceed! Please check your connection.");
      this.disable = true;
    }
  }
  updateGetLucky(getLucky) {
    console.log('updateGetLucky', getLucky);
    if (this.provider.isConnected()) {
      let loading = this.loadingCtrl.create({ content: 'Loading...' });
      loading.present().then(() => {
        this.provider.getData('ID').then(member_id => {
          this.provider.enableGetLucky(member_id,getLucky).subscribe(res => {
            if (res.result === 'true') {
              this.provider.saveData('enable_get_lucky', getLucky);
              this.events.publish(this.provider.GETLUCKY_NOTIFICATION, getLucky);
            }
            else {
              getLucky = !getLucky;
            }
            loading.dismiss();
          }, error => {
            this.provider.toastMessage('Internal Error!');
            getLucky = !getLucky;
            loading.dismiss();
          })
        });
       
      });
    }
    else {
      this.provider.toastMessage("Can't proceed! Please check your connection.");
      this.disable = true;
    }
  }
}
