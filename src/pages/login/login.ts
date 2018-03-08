import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { stagger } from '@angular/core/src/animation/dsl';

import { ChatPage } from '../chat/chat';
import  { EpxProvider} from '../../providers/epx/epx';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';

//phonegap-plugin-push
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // username: string='jaylord.lagud.hpo@gmail.com';
  // password: string='jaylord.lagud.hpo@gmail.com';
  username: string='stan.lee@hpoutsourcinginc.com';
  password: string='VzOo$)dl';
  constructor(
    // private push:Push,
    private epxProvider: EpxProvider,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController ) {
      
      // this.push.hasPermission()
      //   .then((res: any) => {

      //     if (res.isEnabled) {
      //       console.log('We have permission to send push notifications');
      //       this.initPush();
      //     } else {
      //       console.log('We do not have permission to send push notifications');
      //     }
      //   });
  }

  // initPush(){
  //   const options: any = {
  //     android: {},
  //     ios: {
  //         alert: 'true',
  //         badge: true,
  //         sound: 'false'
  //     },
  //     windows: {},
  //     browser: {
  //         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
  //     }
  //  };
   
  //   const pushObject: PushObject = this.push.init(options);


  //   pushObject.on('notification').subscribe((notification: any) => {
  //     console.log('Received a notification', notification)
  //     this.presentConfirm(notification.title,notification.message);
  //   });

  //   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

  //   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  // }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Logging in...',
      dismissOnPageChange: true
    });
    
    loading.present().then(()=>{
      this.loginUser();
    });
  
    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);
  }

  presentConfirm(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  showAlert(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  loginUser(){

    if(/^[a-zA-Z0-9@.]+$/.test(this.username)){
     this.epxProvider.isLogin().then(user => {        
        if(!user){
          this.epxProvider.getLogin(this.username,this.password).subscribe(result =>{   
            this.username = '';
            this.password = '';
                     
            if(result.authentication){
              this.epxProvider.saveUser('ID',result.ID);
              this.epxProvider.saveUser('username',this.username);
              this.epxProvider.saveUser('password',this.password);
              this.epxProvider.saveUser('name',result.name);
              this.epxProvider.saveUser('authentication',result.authentication);
              this.navCtrl.setRoot('MenuPage');
            }
          });
        }
        else{
          this.showAlert('Login Failed','Invalid username or password');
        }
      });
      // this.presentLoadingDefault();
    }else{
      this.showAlert('Error','Invalid username');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
