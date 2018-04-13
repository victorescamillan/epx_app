import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, MenuController, Platform, AlertController, Events } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { isNumber } from 'ionic-angular/util/util';
import { OneSignal } from '@ionic-native/onesignal';

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
  
  constructor(
    private oneSignal: OneSignal,
    private epxProvider: EpxProvider,
    private detectorRef: ChangeDetectorRef,
    private events: Events,
    private platform: Platform,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    public navCtrl: NavController) {

    if (platform.is('cordova')) {
      this.initOneSignal();
      this.initEvents();
      this.epxProvider.getNotification();
    }
  }
 
  //Hide badges when page is refreshed or updates was loaded.
  initEvents() {
    this.events.subscribe(this.epxProvider.TRIP_BADGE, badge => {
      console.log('receive trip badge', badge);
      this.tripBadge = badge;
    });
    this.events.subscribe(this.epxProvider.SOLO_BADGE, badge => {
      console.log('receive solo badge', badge);
      this.soloBadge = badge;
    });
  }
  initOneSignal(){
    this.oneSignal.startInit('e70b4949-f7fa-4c3b-adfc-9e4d1ac64782', '1035774532822');
    this.epxProvider.getData('ID').then(user_id => {
      this.oneSignal.sendTag('user_id',user_id);
    })
   
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      // do something when notification is received
      
      console.log('notificaiton received. ',data);
      let target = data.payload.additionalData.target;
      let update = data.payload.additionalData.update;
      console.log('target. ',target);
      switch (target) {
        case 'trip':
          {
            //Cache trip update count to make it accessible to other components.
            this.epxProvider.saveData(this.epxProvider.TRIP_BADGE, update).then(badge => {
              // console.log('result',badge);
              this.tripBadge = badge;
              this.detectorRef.detectChanges();
            });
            break;
          }
        case 'solo': {
          this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, update).then(badge => {
            // console.log('result',badge);
            this.soloBadge = badge;
            this.detectorRef.detectChanges();
          });
          break;
        }
      }
    });
 
    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // do something when a notification is opened
      console.log('notificaiton open. ',data);
      let target = data.notification.payload.additionalData.target;
      let update = data.notification.payload.additionalData.update;
      switch (target) {
        case 'trip':
          {
            //Cache trip update count to make it accessible to other components.
            this.epxProvider.saveData(this.epxProvider.TRIP_BADGE, update).then(badge => {
              // console.log('result',badge);
              this.tripBadge = badge;
              this.detectorRef.detectChanges();
            });
            break;
          }
        case 'solo': {
          this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, update).then(badge => {
            // console.log('result',badge);
            this.soloBadge = badge;
            this.detectorRef.detectChanges();
          });
          break;
        }
        default:{
          this.navCtrl.push('NotificationPage');
        }
      }
    });

    this.oneSignal.endInit();
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
