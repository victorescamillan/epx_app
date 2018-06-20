import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController, Platform, Events, MenuController, App } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { AppVersion } from '@ionic-native/app-version';
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = 'TabsPage';
  @ViewChild(Nav) nav: Nav;
  mentorBadge: number = 0;
  assistBadge: number = 0;
  pages: any[] = [
    { title: 'Business', pageName: 'BusinessPage', tabComponent: 'BusinessPage', index: 0, icon: 'briefcase', badge: 0 },
    { title: 'Member Assist', pageName: 'AssistPage', tabComponent: 'AssistPage', index: 1, icon: 'hand', badge: this.mentorBadge },
    { title: 'Mentor Match', pageName: 'MentorPage', tabComponent: 'MentorPage', index: 2, icon: 'phone-portrait', badge: this.assistBadge },
    { title: 'Settings', pageName: 'SettingsPage', tabComponent: 'SettingsPage', index: 3, icon: 'settings', badge: 0 },
  ]

  name: string;
  role: string;
  version: string;
  avatar_url: string;
  details: any;
  constructor(
    private app: App,
    private menuCtrl: MenuController,
    private events: Events,
    private appVersion: AppVersion,
    private platform: Platform,
    public alertCtrl: AlertController, private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.epxProvider.getData('member_details').then(res => {
      
      this.name = res.name;
      this.role = res.role;
      this.avatar_url = res.avatar;

      if (platform.is('cordova')) {
        this.epxProvider.initializeChat(res.ID);
        appVersion.getVersionNumber().then(res => {
          this.version = res;
          console.log('version', res);
        });
      }
      this.details = res;
    })
  }
  memberDetails() {
    this.navCtrl.push('MemberDetailsPage', { data: this.details });
  }
  openPage(p) {
    this.navCtrl.push(p.pageName);
    // let backAction = this.platform.registerBackButtonAction(() => {
    //   this.navCtrl.pop();
    //   backAction();
    // }, 2);
  }
  logoutUser() {
    this.menuCtrl.close();
    this.epxProvider.clearUser();
    this.events.publish(this.epxProvider.IS_LOGIN_NOTIFICATION, 'false');
    this.navCtrl.setRoot('LoginPage');
    // this.rootPage = 'LoginPage';
  }
  launchChat() {
    this.epxProvider.launchChat();
    this.menuCtrl.close();
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Logout',
      message: "Do you want to continue logout?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Okay',
          handler: data => {
            this.logoutUser();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
