import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ModalController,ToastController  } from 'ionic-angular';
import  { EpxProvider} from '../../providers/epx/epx';
import { TripDetailsPage} from '../trip-details/trip-details';
import { TripFilterPage} from '../trip-filter/trip-filter';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  
  tripList = [];
  selectedTrips;
  is_interested: boolean = false;
  id: any;
  date:string = new Date().toLocaleString();
  constructor(
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private loadingCtrl : LoadingController,
    private epxProvider: EpxProvider,
    public navCtrl: NavController, public navParams: NavParams) {
      this.presentLoadingDefault();
      

      console.log('current date: ' + this.date);
  }

  //Filter Page
  showFilter() {
    let filterModal = this.modalCtrl.create(TripFilterPage);
    filterModal.present();
  }

  logoutUser(){
    this.epxProvider.clearUser();
    this.navCtrl.setRoot('LoginPage');
  }
  //Loading Indicator
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Trips...'
    });
  
    loading.present().then(() => {
      this.loadTrips();
      
      setTimeout(() => {
        loading.dismiss();
      }, 12000);
    });
  }
  //Get Trips List
  loadTrips(){
    this.epxProvider.getTrips().subscribe(data => {
      console.log('trips data',data);
      this.tripList = Object.keys(data).map(key => data[key])
    });
  }
  //Navigate to Trip Details
  tripDetails(trip){
    this.navCtrl.push(TripDetailsPage,{data: trip});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripsPage');
  }
  //Interested
  clickInterest(ID){
    if(!this.is_interested){
      this.presentToast("Interested");
      this.is_interested = true;
      this.id = ID;
    }
    else{
      this.presentToast("I'm Interested");
      this.is_interested = false;
      this.id = ID;
    }
  }
  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
