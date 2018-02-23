import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import'rxjs/add/operator/map'
import'rxjs/add/operator/do'
import'rxjs/add/operator/catch'
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
/*
  Generated class for the EpxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EpxProvider {
  
  // private trips_url: string='http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=all-trip-details&user_id=';
  public login_url: string='http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=user_logged_in&';
  public trips_url: string='http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips&user_id=';
  // public trips_url: string='http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=test-api&user_id=';

  public trips_details_url: string='http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips-single-page&trip_id=';
  public solo_url: string='http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo';
  public vault_url: string='http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault';
  
  trips: Observable<any>;
  constructor( public cache: CacheService,  private storage: Storage, private httpClient: HttpClient) {
  // Set TTL to 12h
  cache.setDefaultTTL(60 * 60 * 12);
 
  // Keep our cached results when device is offline!
  cache.setOfflineInvalidate(false);

    // this.trips = this.http.get(this.trips_details_url);
    // this.trips.subscribe(data => {
    //   console.log('test: ',data);
    // });
  }

  getTrips(){
    return this.httpClient.get(this.trips_url)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }
  getTrips1(user_id){
    return this.httpClient.get(this.trips_url + user_id)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }
  getTripDetails(id){
    return this.httpClient.get(this.trips_details_url + id)   
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  getLogin(username, password){
    return this.httpClient.get(this.login_url + 'username=' + username + '&password='+ password)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server Error.");
  }
  private logResponse(res: Response){
    console.log(res);
  }
  private extractData(res: Response){
    return res;
  }
  saveUser(name, value){
    return this.storage.set(name,value);
  }
  getUser(name){
    return this.storage.get(name);
  }
  // getUserID(){
  //   return this.getUser('ID').then(data => {
  //     return data && data !== -1;
  //   });
  // }
  removeUser(name){
    return this.storage.remove(name);
  }
 clearUser(){
   this.storage.clear().then(()=>{
     console.log('all keys are cleared.')
   });
 }
 isLogin(){
  return this.getUser('ID').then(data =>{
    // console.log('login details', data);
    // return data && data !== -1;
    if(data == null){
      return false;
    }
    else{
      return true;
    }
  });
 }

 
}
