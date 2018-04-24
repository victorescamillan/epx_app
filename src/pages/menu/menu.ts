import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';

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
    { title: 'Mentor Match', pageName: 'MentorPage', tabComponent: 'MentorPage', index: 2, icon: 'phone-portrait', badge: this.assistBadge},
    { title: 'Settings', pageName: 'SettingsPage', tabComponent: 'SettingsPage', index: 3, icon: 'settings', badge: 0},
  ]

  name: string;
  constructor(public alertCtrl: AlertController,private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.epxProvider.getData('name').then(name => {
      this.name = name;
    })
  }

  openPage(p) {
    this.navCtrl.push(p.pageName);
  }
 
  logoutUser(){
    this.epxProvider.clearUser();
    this.navCtrl.setRoot('LoginPage');
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
