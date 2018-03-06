import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import  { EpxProvider} from '../providers/epx/epx';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    private epxProvider: EpxProvider,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.epxProvider.isLogin().then(user => {
        if(user){
          this.rootPage = 'MenuPage';
        }
        else{
          this.rootPage = 'LoginPage';
        }
      })
      statusBar.overlaysWebView(true);
      splashScreen.hide();
    });
  }
}

