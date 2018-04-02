import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, MenuController,Platform,AlertController, Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tripsRoot = 'TripsPage'
  vaultRoot = 'VaultPage'
  soloRoot = 'SoloPage'
  membersRoot = 'MembersPage'

  badgeCount = 0;
  constructor(
    private detectorRef: ChangeDetectorRef,
    private events: Events,
    private push: Push,
    platform: Platform,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    public navCtrl: NavController) {
    if(platform.is('cordova')){
      this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          this.initPush();
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
    }
  }
  initPush() {
    const options: PushOptions = {
      android: {
        senderID: '1035774532822',
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false',

      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((next:any) =>{
      console.log('next response', next);
    }, (notification: any) => {
      console.log('Received a notification', notification);
      let additionalData = notification.additionalData;
      this.badgeCount = additionalData.new;
      console.log('badge value',additionalData.new);
      switch(additionalData.target){
        case 'trips':
        {
          // this.events.publish('cart:updated',badge_value => {
           
          //   console.log('badge value',badge_value);
          // });
          // this.detectorRef.detectChanges();
          // this.showAlert(notification.title,notification.message);
          break;
        }
      }
    
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  showAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  openSideMenu() {
    this.menuCtrl.toggle();
  }
}
