import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EpxProvider } from '../providers/epx/epx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  constructor(
    private events: Events,
    private epxProvider: EpxProvider,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#2b3e50');
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      console.log('platform is ready');
    });
 
    this.epxProvider.getData('member_details').then(res => {
      console.log('member_details', res)
      if (res != null) {
        this.rootPage = 'MenuPage';
      }
      else {
        this.rootPage = 'LoginPage';
      }
    });
  }
}

