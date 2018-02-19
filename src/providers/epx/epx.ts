import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import'rxjs/add/operator/map'
import'rxjs/add/operator/do'
import'rxjs/add/operator/catch'
import { Storage } from '@ionic/storage';

/*
  Generated class for the EpxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EpxProvider {

  private trips_url: string='http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips';
  private login_url: string='http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=user_logged_in&';
  trips: Observable<any>;
  constructor(   private storage: Storage, private httpClient: HttpClient) {
  
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

  getLogin(username, password){
    return this.httpClient.get(this.login_url + 'username=' + username + '&password='+ password)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  saveUser(name, value){
    return this.storage.set(name,value);
  }
  getUser(name){
    return this.storage.get(name);
  }
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
    console.log('login details', data);
    return data && data !== -1;
  });
 }
}
