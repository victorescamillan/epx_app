import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { stagger } from '@angular/core/src/animation/dsl';
import { ChatPage } from '../chat/chat';
import { EpxProvider } from '../../providers/epx/epx';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // username: string='jaylord.lagud.hpo@gmail.com';
  // password: string='jaylord.lagud.hpo@gmail.com';
  // username: string = 'stan.lee@hpoutsourcinginc.com';
  // password: string = 'VzOo$)dl';
  username: string = '';
  password: string = '';
  constructor(
    private epxProvider: EpxProvider,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  loginUser() {
    let loading = this.loadingCtrl.create({
      content: 'Logging in...',
      dismissOnPageChange: true
    });
    loading.present().then(() => {
      if (/^[a-zA-Z0-9@.]+$/.test(this.username)) {
        this.epxProvider.getLogin(this.username, this.password).subscribe(result => {
          if (result.authentication) {
            this.username = '';
            this.password = '';
            this.epxProvider.saveData('ID', result.ID);
            this.epxProvider.saveData('name', result.name);
            this.epxProvider.saveData('authentication', result.authentication);
            this.navCtrl.setRoot('MenuPage');
          }
          else {
            this.showAlert('Login Failed', 'Invalid username or password');
            loading.dismiss();
          }
        });
      } else {
        this.showAlert('Error', 'Invalid username');
        loading.dismiss();
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
