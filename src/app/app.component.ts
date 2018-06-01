import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EpxProvider } from '../providers/epx/epx';
declare var CCCometChat : any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  licenseKey: string = "COMETCHAT-3NDI5-DIFJW-6WFCX-ZP9HI";
  apiKey: string = "50992xf9a72c7107c357bc79cd1d43c60facb0"; 
  constructor(
    private epxProvider: EpxProvider,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#2b3e50');
      statusBar.overlaysWebView(false);
      splashScreen.hide();
    });
   
    this.epxProvider.getData('member_details').then(res => {
      console.log('member_details',res)
      if(res != null){
        this.initializeChat(res.ID);
        this.rootPage = 'MenuPage';
      }
      else {
        this.rootPage = 'LoginPage';
      }
    });
  }
  initializeChat(user_id) {
    CCCometChat.initializeCometChat("", this.licenseKey, this.apiKey, true,  response => {
      console.log('Inside Success Callback',response);
      CCCometChat.loginWithUID(user_id, function success(response) {
        console.log('Logged in as' + user_id,response);
      }, function failure(error) {
        console.log('Login failure Callback',error);
      });
    }, error => {
      console.log('Fail Callback ',error);
    });
  }
}

