import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
// import { GoogleMaps } from '@ionic-native/google-maps';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EpxProvider } from '../providers/epx/epx';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CacheModule } from 'ionic-cache';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import {AppVersion }  from '@ionic-native/app-version'

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CacheModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    AppVersion,
    OneSignal,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EpxProvider,
    Network,
    // GoogleMaps,
  ]
})
export class AppModule { }
