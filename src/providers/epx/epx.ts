import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";

/*
  Generated class for the EpxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EpxProvider {

  // LOGIN
  public login_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=user_logged_in&';
  // TRIPS
  public trips_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips&user_id=';
  public trips_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-test-pagination&user_id=';
  public trips_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips-single-page&trip_id=';
  public trips_interest_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-interest&trip_id=';
  public trips_tags_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-tags&tag=';

  public trips_filter_url: string = 'https://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-filter&user_id=295&trip-type=nature';
  // SOLO
  public solo_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo';
  public solo_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-with-pagination&paged=';
  public solo_tag_url: string = '';
  public solo_filter_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-filter&to_date=03/31/2018&from_date=03/06/2018';
  
  // VAULT
  public vault_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault';
  public vault_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-with-pagination&paged=';
  public vault_tag_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-tags&tag=';
  public vault_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-details&vault-id=';

  // MEMBERS
  public members_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=members';
  public member_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=members-with-pagination&paged=';
  public member_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-details&user_id=';
  
  // BUSINESS
  public business_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business';
  public business_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-with-pagination&paged=';
  public business_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-details&business-id=';
  
  constructor(private storage: Storage, private httpClient: HttpClient) {
  }

  getLogin(username, password) {
    return this.httpClient.get(this.login_url + 'username=' + username + '&password=' + password)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getTrips(user_id) {
    return this.httpClient.get(this.trips_url + user_id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getTripsInfinite(user_id,page) {
    return this.httpClient.get(this.trips_infinite_url + user_id + '&list_size=10&page_no=' + page)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getTripDetails(id) {
    return this.httpClient.get(this.trips_details_url + id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getTripTags(tag,user_id) {
    return this.httpClient.get(this.trips_tags_url + tag + "&user_id=" + user_id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getTripInterest(trip_id, user_id) {
    return this.httpClient.get(this.trips_interest_url + trip_id + '&user_id=' + user_id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }

  getsolo() {
    return this.httpClient.get(this.solo_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getSoloTags(tag) {
    return this.httpClient.get(this.solo_infinite_url + tag)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getSoloInfinite(page) {
    return this.httpClient.get(this.solo_infinite_url + page)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getVault() {
    return this.httpClient.get(this.vault_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getVaultInfinite(page) {
    return this.httpClient.get(this.vault_infinite_url + page)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getVaultTags(tag) {
    return this.httpClient.get(this.vault_tag_url + tag)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getVaultDetails(id) {
    return this.httpClient.get(this.vault_details_url + id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMembers() {
    return this.httpClient.get(this.members_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMembersInfinite(page) {
    return this.httpClient.get(this.member_infinite_url + page)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMemberDetails(user_id) {
    return this.httpClient.get(this.member_details_url + user_id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getBusiness() {
    return this.httpClient.get(this.business_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getBusinessInfinite(page) {
    return this.httpClient.get(this.business_infinite_url + page)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getBusinessDetails(id) {
    return this.httpClient.get(this.business_details_url + id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server Error.");
  }
  private logResponse(res: Response) {
    console.log(res);
  }
  private extractData(res: Response) {
    return res;
  }
  saveData(name, value) {
    return this.storage.set(name, value);
  }
  getData(key) {
    return this.storage.get(key);
  }
  removeData(name) {
    return this.storage.remove(name);
  }
  clearUser() {
    this.storage.clear().then(() => {
      console.log('all keys are cleared.')
    });
  }
  isLoaded(name) {
    return this.getData('name').then(data => {
      if (data == null) {
        return false;
      }
      else {
        return true;
      }
    });
  }
  isLogin() {
    return this.getData('ID').then(data => {
      // console.log('login details', data);
      // return data && data !== -1;
      if (data == null) {
        return false;
      }
      else {
        return true;
      }
    });
  }
}
