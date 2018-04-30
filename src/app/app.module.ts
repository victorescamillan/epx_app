import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
// import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { TripsPage } from '../pages/trips/trips';
import { SoloPage } from '../pages/solo/solo';
import { VaultPage } from '../pages/vault/vault';
import { MembersPage } from '../pages/members/members';
import { MenuPage } from '../pages/menu/menu';
import { TabsPage } from '../pages/tabs/tabs';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { EpxProvider } from '../providers/epx/epx';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CacheModule } from 'ionic-cache';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
// import { AutoHideDirective } from '../directives/auto-hide/auto-hide';
@NgModule({
  declarations: [
    MyApp,
    // AutoHideDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
