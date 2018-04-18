import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { Geolocation } from '@ionic-native/geolocation';
// import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { EpxProvider } from '../providers/epx/epx';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import { CacheModule } from 'ionic-cache';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { DocumentViewer } from '@ionic-native/document-viewer';


var config = {
  apiKey: "AIzaSyD9l4jYr1CsW9LRaDWrwkcjc79amz97_JA",
  authDomain: "phoenix-dev-181002.firebaseapp.com",
  databaseURL: "https://phoenix-dev-181002.firebaseio.com",
  projectId: "phoenix-dev-181002",
  storageBucket: "phoenix-dev-181002.appspot.com",
  messagingSenderId: "462345808165"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CacheModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    DocumentViewer,
    OneSignal,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EpxProvider,
    Network,
    // GoogleMaps,
  ]
})
export class AppModule {}
