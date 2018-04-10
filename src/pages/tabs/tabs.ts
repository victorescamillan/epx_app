import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, MenuController, Platform, AlertController, Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { EpxProvider } from '../../providers/epx/epx';
import { isNumber } from 'ionic-angular/util/util';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tripsRoot = 'TripsPage'
  vaultRoot = 'VaultPage'
  soloRoot = 'SoloPage'
  membersRoot = 'MembersPage'

  tripBadge = 0;
  soloBadge = 0;
  vaultBadge = 0;
  memberBadge = 0;
  constructor(
    private epxProvider: EpxProvider,
    private detectorRef: ChangeDetectorRef,
    private events: Events,
    private push: Push,
    platform: Platform,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    public navCtrl: NavController) {

    if (platform.is('cordova')) {
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
    this.initEvents();
  }
 
  //Hide badges when page is refreshed or updates was loaded.
  initEvents() {
    this.events.subscribe(this.epxProvider.TRIP_BADGE, badge => {
      console.log('badge value', badge);
      this.tripBadge = badge;
    });
    this.events.subscribe(this.epxProvider.SOLO_BADGE, badge => {
      console.log('badge value', badge);
      this.soloBadge = badge;
    });
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

    pushObject.on('notification').subscribe((notification: any) => {
      // console.log('Received a notification', notification);
      let additionalData = notification.additionalData;
      switch (additionalData.target) {
        case 'trip':
          {
            //Cache trip update count to make it accessible to other components.
            this.epxProvider.saveData(this.epxProvider.TRIP_BADGE, additionalData.update).then(badge => {
              // console.log('result',badge);
              this.tripBadge = badge;
              this.detectorRef.detectChanges();
            });
            break;
          }
        case 'solo': {
          this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, additionalData.update).then(badge => {
            // console.log('result',badge);
            this.soloBadge = badge;
            this.detectorRef.detectChanges();
          });
          break;
        }

        default: {
          this.navCtrl.push('NotificationPage');
        }
      }
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  showAlert(title, message) {
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
