import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, MenuController, Platform, AlertController, Events } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tripsRoot = 'TripsPage';
  vaultRoot = 'VaultPage';
  soloRoot = 'SoloPage';
  membersRoot = 'MembersPage';

  tripBadge = 0;
  soloBadge = 0;
  vaultBadge = 0;
  memberBadge = 0;
  mentorBadge = 0;
  assistBadge = 0;

  isAppOpen: Boolean = false;
  tripPartialDetails: any;
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
  initEvents() {
    //Hide badges when page is refreshed or updates was loaded.
    this.events.subscribe(this.epxProvider.TRIP_BADGE, badge => {
      console.log('receive trip badge', badge);
      this.tripBadge = badge;
    });
    this.events.subscribe(this.epxProvider.SOLO_BADGE, badge => {
      console.log('receive solo badge', badge);
      this.soloBadge = badge;
    });
    this.events.subscribe(this.epxProvider.VAULT_BADGE, badge => {
      console.log('receive solo badge', badge);
      this.vaultBadge = badge;
    });
    this.events.subscribe(this.epxProvider.MEMBER_BADGE, badge => {
      console.log('receive solo badge', badge);
      this.memberBadge = badge;
    });

    //Update notification tags.
    this.events.subscribe(this.epxProvider.MEMBER_NOTIFICATION, value => {
      this.oneSignal.sendTag('enable_member', value);
      this.epxProvider.saveData(this.epxProvider.MEMBER_NOTIFICATION, value);
    })
    this.events.subscribe(this.epxProvider.VAULT_NOTIFICATION, value => {
      this.oneSignal.sendTag('enable_vault', value);
      this.epxProvider.saveData(this.epxProvider.VAULT_NOTIFICATION, value);
    })
    this.events.subscribe(this.epxProvider.GETLUCKY_NOTIFICATION, value => {
      this.oneSignal.sendTag('enable_get_lucky', value);
      this.epxProvider.saveData(this.epxProvider.GETLUCKY_NOTIFICATION, value);
    })

    this.events.subscribe(this.epxProvider.IS_LOGIN_NOTIFICATION, value => {
      this.oneSignal.sendTag('is_login', value);
    });
    

  }
  initOneSignal() {
    this.oneSignal.startInit('13cedc03-fa5f-4f96-ba81-3ed7f3698052', '188374332009');
    this.epxProvider.getData('member_details').then(res => {
      this.oneSignal.sendTag('user_id', res.ID);
      this.oneSignal.sendTag('is_login', 'true');
      this.oneSignal.sendTag('user_type', 'ideahub'); //For testing = 'ideahub' : For live = 'production'
    });
    // this.epxProvider.getData('email').then(email => {
    //   console.log('email',email);
    //   this.oneSignal.syncHashedEmail(email);
    // });
    this.epxProvider.getData('enable_member').then(res => {
      this.oneSignal.sendTag('enable_member', res);
    });
    this.epxProvider.getData('enable_vault').then(res => {
      this.oneSignal.sendTag('enable_vault', res);
    });
    this.epxProvider.getData('enable_get_lucky').then(res => {
      this.oneSignal.sendTag('enable_get_lucky', res);
    });

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      // do something when notification is received
      console.log('notification received. ', data);
      let target = data.payload.additionalData.target;
      let update = data.payload.additionalData.update;
      let trip_id = data.payload.additionalData.product_id;

      this.epxProvider.getData('ID').then(user_id => {
        this.epxProvider.getTripPartialDetails(trip_id,user_id).subscribe(res => {
          let data = {
            ID: res.ID,
            isInterested: res.trip_interested.interested,
            sashes_image: res.sashes_image,
            location: res.map_info.map_address,
            lat: Number(res.map_info.map_latitude),
            lng: Number(res.map_info.map_longitude),
            product_cat: res.product_cat,
            title: res.title,
            trip_gallery: res.trip_gallery,
            full_content: res.full_content
          }
          this.tripPartialDetails = data;
        },error => {
          this.epxProvider.toastMessage('Internal Error!');
        });
      })
      
      
      this.isAppOpen = true;
      switch (target) {
        case 'trip': {
          //Cache trip update count to make it accessible to other components.
          this.epxProvider.getData(this.epxProvider.TRIP_BADGE).then(old_badge => {
            if (old_badge != null && old_badge > 0) {
              let badge = Number(update) + Number(old_badge);
              this.epxProvider.saveData(this.epxProvider.TRIP_BADGE, badge).then(new_badge => {
                this.tripBadge = new_badge;
                this.detectorRef.detectChanges();
              });
            }
            else {
              this.epxProvider.saveData(this.epxProvider.TRIP_BADGE, update).then(new_badge => {
                this.tripBadge = new_badge;
                this.detectorRef.detectChanges();
              });
            }
          });
          break;
        }

        // case 'solo': {
        //   this.epxProvider.getData(this.epxProvider.SOLO_BADGE).then(old_badge => {
        //     if (old_badge != null && old_badge > 0) {
        //       let badge = Number(update) + Number(old_badge);
        //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, badge).then(new_badge => {
        //         this.soloBadge = new_badge;
        //         this.detectorRef.detectChanges();
        //       });
        //     }
        //     else {
        //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, update).then(new_badge => {
        //         this.soloBadge = new_badge;
        //         this.detectorRef.detectChanges();
        //       });
        //     }
        //   });
        //   break;
        // }
        case 'vault': {
          this.epxProvider.getData(this.epxProvider.VAULT_BADGE).then(old_badge => {
            if (old_badge != null && old_badge > 0) {
              let badge = Number(update) + Number(old_badge);
              this.epxProvider.saveData(this.epxProvider.VAULT_BADGE, badge).then(new_badge => {
                this.vaultBadge = new_badge;
                this.detectorRef.detectChanges();
              });
            }
            else {
              this.epxProvider.saveData(this.epxProvider.VAULT_BADGE, update).then(new_badge => {
                this.vaultBadge = new_badge;
                this.detectorRef.detectChanges();
              });
            }
          });
          break;
        }
        case 'member': {
          this.epxProvider.getData(this.epxProvider.MEMBER_BADGE).then(old_badge => {
            if (old_badge != null && old_badge > 0) {
              let badge = Number(update) + Number(old_badge);
              this.epxProvider.saveData(this.epxProvider.MEMBER_BADGE, badge).then(new_badge => {
                this.memberBadge = new_badge;
                this.detectorRef.detectChanges();
              });
            }
            else {
              this.epxProvider.saveData(this.epxProvider.MEMBER_BADGE, update).then(new_badge => {
                this.memberBadge = new_badge;
                this.detectorRef.detectChanges();
              });
            }
          });
          break;
        }

      }
    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // do something when a notification is opened
      console.log('notification open. ', data);
      let target = data.notification.payload.additionalData.target;
      let update = data.notification.payload.additionalData.update;

      let isFocus: boolean = data.notification.isAppInFocus;
      let trip = data.notification.payload.additionalData;
      console.log('isAppInFocus. ', isFocus);
      if (this.isAppOpen) {
        switch (target) {
          case 'mentor-match': {
            this.navCtrl.push('MentorPage')
            break;
          }
        
          case 'trip-detail': {
            let data = {
              ID: trip.ID,
              isInterested: trip.isInterested,
              sashes_image: trip.sashes_image,
              location: trip.location,
              lat: Number(trip.lat),
              lng: Number(trip.lng)
            }
            this.navCtrl.push('TripDetailsPage', { data: data });
          }
          case 'mentor-match': {
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('MentorPage');
            break;
          }
          case 'member-assist': {
            // let assist = this.modalCtrl.create('AssistPage',{isNotification:true});
            // assist.present();
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('AssistPage');
            break;
          }
          case 'get-lucky': {
            // let assist = this.modalCtrl.create('ChatPage',{isNotification:true});
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('ChatPage');
            
          }
          case 'member-assist-chat': {
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('ChatPage');
          }
          case 'trip-notice': {
            console.log('tripPartialDetails',this.tripPartialDetails);
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('TripDetailsPage', {data : this.tripPartialDetails});
          }
        }
      }
      else {
        switch (target) {
          case 'trip': {
            //Cache trip update count to make it accessible to other components.
            this.epxProvider.getData(this.epxProvider.TRIP_BADGE).then(old_badge => {
              if (old_badge != null && old_badge > 0) {
                let badge = Number(update) + Number(old_badge);
                this.epxProvider.saveData(this.epxProvider.TRIP_BADGE, badge).then(new_badge => {
                  this.tripBadge = new_badge;
                  this.detectorRef.detectChanges();
                });
              }
              else {
                this.epxProvider.saveData(this.epxProvider.TRIP_BADGE, update).then(new_badge => {
                  this.tripBadge = new_badge;
                  this.detectorRef.detectChanges();
                });
              }
            });
            break;

          }
          case 'trip-detail': {
            let data = {
              ID: trip.ID,
              isInterested: trip.isInterested,
              sashes_image: trip.sashes_image,
              location: trip.location,
              lat: Number(trip.lat),
              lng: Number(trip.lng)
            }
            this.navCtrl.push('TripDetailsPage', { data: data });
          }
          // case 'solo': {
          //   this.epxProvider.getData(this.epxProvider.SOLO_BADGE).then(old_badge => {
          //     if (old_badge != null && old_badge > 0) {
          //       let badge = Number(update) + Number(old_badge);
          //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, badge).then(new_badge => {
          //         this.soloBadge = new_badge;
          //         this.detectorRef.detectChanges();
          //       });
          //     }
          //     else {
          //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, update).then(new_badge => {
          //         this.soloBadge = new_badge;
          //         this.detectorRef.detectChanges();
          //       });
          //     }
          //   });
          //   break;
          // }
          case 'vault': {
            this.epxProvider.getData(this.epxProvider.VAULT_BADGE).then(old_badge => {
              if (old_badge != null && old_badge > 0) {
                let badge = Number(update) + Number(old_badge);
                this.epxProvider.saveData(this.epxProvider.VAULT_BADGE, badge).then(new_badge => {
                  this.vaultBadge = new_badge;
                  this.detectorRef.detectChanges();
                });
              }
              else {
                this.epxProvider.saveData(this.epxProvider.VAULT_BADGE, update).then(new_badge => {
                  this.vaultBadge = new_badge;
                  this.detectorRef.detectChanges();
                });
              }
            });
            break;
          }
          case 'member': {
            this.epxProvider.getData(this.epxProvider.MEMBER_BADGE).then(old_badge => {
              if (old_badge != null && old_badge > 0) {
                let badge = Number(update) + Number(old_badge);
                this.epxProvider.saveData(this.epxProvider.MEMBER_BADGE, badge).then(new_badge => {
                  this.memberBadge = new_badge;
                  this.detectorRef.detectChanges();
                });
              }
              else {
                this.epxProvider.saveData(this.epxProvider.MEMBER_BADGE, update).then(new_badge => {
                  this.memberBadge = new_badge;
                  this.detectorRef.detectChanges();
                });
              }
            });
            break;
          }
          case 'mentor-match': {
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('MentorPage');
            break;
          }
          case 'member-assist': {
            // let assist = this.modalCtrl.create('AssistPage',{isNotification:true});
            // assist.present();
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('AssistPage');
            break;
          }
          case 'get-lucky': {
            // let assist = this.modalCtrl.create('ChatPage',{isNotification:true});
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('ChatPage');
            
          }
          case 'member-assist-chat': {
            this.events.publish(this.epxProvider.CLOSE_PAGE, true);
            this.navCtrl.push('ChatPage');
          }
          case 'trip-notice': {
            console.log('tripPartialDetails',this.tripPartialDetails);
            this.epxProvider.getData('ID').then(user_id => {
              let trip_id = data.notification.payload.additionalData.product_id;
              this.epxProvider.getTripPartialDetails(trip_id,user_id).subscribe(res => {
                let data = {
                  ID: res.ID,
                  isInterested: res.trip_interested.interested,
                  sashes_image: res.sashes_image,
                  location: res.map_info.map_address,
                  lat: Number(res.map_info.map_latitude),
                  lng: Number(res.map_info.map_longitude),
                  product_cat: res.product_cat,
                  title: res.title,
                  trip_gallery: res.trip_gallery,
                  full_content: res.full_content
                }
                this.events.publish(this.epxProvider.CLOSE_PAGE, true);
                this.navCtrl.push('TripDetailsPage', {data : data});
              },error => {
                this.epxProvider.toastMessage('Internal Error!');
              });
            })
           
          }
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
