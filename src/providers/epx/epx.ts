import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { ToastController, Events } from 'ionic-angular';
// import { CacheService } from "ionic-cache";

/*
  Generated class for the EpxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EpxProvider {
  target: string = 'dev';
  // LOGIN
  public login_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=user_logged_in&';
  public login_dev_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=user_logged_in&';
  public forgot_password_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=reset-password&user-login=';

  // TRIPS
  public trips_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips&user_id=';
  public trips_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips-with-pagination&user_id=';
  public trips_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips-single-page&trip_id=';
  public trips_interest_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-interest&trip_id=';
  public trips_tags_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-tags&tag=';
  public trips_filter_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-filter&user_id=';
  public trips_region_and_type_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-taxonomy';
  // SOLO
  public solo_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo';
  public solo_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-with-pagination&paged=';
  public solo_tag_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-tags-with-pagination&user_id=';
  public solo_filter_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-filter&to_date=';

  // VAULT
  public vault_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault';
  public vault_skill_category_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-taxonomy';
  public vault_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-with-pagination&list_size';
  public vault_tag_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-tags&tag=';
  public vault_category_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-cat-with-pagination&paged=1&cat=';
  public vault_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-details&vault-id=';
  public vault_filter_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-filter&skill=';
  public vault_search_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-filter&search=';

  // MEMBERS
  public members_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=members';
  public member_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=members-with-pagination&paged=';
  public member_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-details&user_id=';
  public member_skills_industry_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-taxonomy';
  public member_search_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-filter&nameSearch=';
  public member_filter_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-filter&member_role=full_members&business=';
  public member_search_map_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-map';

  // BUSINESS
  public business_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business';
  public business_infinite_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-with-pagination&paged=';
  public business_details_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-details&business-id=';
  public business_search_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-filter&nameSearch=';
  public business_filter_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-filter&search_skill=';

  //MENTOR MATCH
  public mentormatch_skills_url: string = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=get-mentor-skills';
  public mentormatch_submit_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=mentor-match&skill=';

  //MEMBER ASSIST
  public memberassist_submit_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-assist&user_id=';
  public memberassist_filter_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-assist-filter&user_id=';
  public memberassist_respond_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=connect-member-assist&user_id=';

//USER OPT-IN
public enable_vault_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=enable-settings-api&user_id=423&setting=enable_vault&is_enable=';
public enable_member_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=enable-settings-api&user_id=423&setting=enable_member&is_enable=';
public enable_getlucky_url: string = 'https://' + this.target + '.epxworldwide.com/JSON%20API/epx-json-data.php?request=enable-settings-api&user_id=423&setting=enable_get_lucky&is_enable=';

  public TRIP_BADGE: string = "TRIP_BADGE";
  public SOLO_BADGE: string = "SOLO_BADGE";
  public VAULT_BADGE: string = "VAULT_BADGE";
  public MEMBER_BADGE: string = "MEMBER_BADGE";
  public MENTOR_BADGE: string = "MENTOR_BADGE";
  public ASSIST_BADGE: string = "ASSIST_BADGE";
  public MEMBER_NOTIFICATION: string = "MEMBER_NOTIFICATION";
  public VAULT_NOTIFICATION: string = "VAULT_NOTIFICATION";
  public GETLUCKY_NOTIFICATION: string = "GETLUCKY_NOTIFICATION";
  public IS_LOGIN_NOTIFICATION: string = "IS_ONLINE_NOTIFICATION";
  public CLOSE_PAGE: string = "CLOSE_PAGE";
  public DELAY_TYPE: string = "all";
  public TTL: number = 60 * 60 * 12;

  public PAGE_SIZE10: number = 10;
  public PAGE_SIZE15: number = 15;
  constructor(private events: Events, private toastCtrl: ToastController, private network: Network, private storage: Storage, private httpClient: HttpClient) {
    this.checkConnection();
  }

  updateNotification(name) {
    this.saveData(name, 0).then(() => {
      this.events.publish(name, 0);
    })
  }
  getNotification() {
    this.getData(this.TRIP_BADGE).then(badge => {
      if (badge != null && badge > 0) {
        console.log('trip badge: ', badge);
        this.events.publish(this.TRIP_BADGE, badge);
      }
    });
    this.getData(this.SOLO_BADGE).then(badge => {
      if (badge != null && badge > 0) {
        console.log('trip badge: ', badge);
        this.events.publish(this.SOLO_BADGE, badge);
      }
    });
  }
  isConnected(): boolean {
    let connection_type = this.network.type;
    return connection_type !== 'unknown' && connection_type !== 'none';
  }
  checkConnection() {
    this.network.onConnect().subscribe(data => {
      console.log(data);
      // this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
    this.network.onDisconnect().subscribe(data => {
      console.log(data);
      // this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type;
    this.toastCtrl.create({
      message: 'You are now ' + connectionState + ' via ' + networkType,
      duration: 3000
    }).present();
  }
  toastMessage(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

  getLogin(username, password) {
    return this.httpClient.get(this.login_dev_url + 'username=' + username + '&password=' + password)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  requestForgotPassword(email) {
    return this.httpClient.get(this.forgot_password_url + email)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getTripRegionAndType() {
    return this.httpClient.get(this.trips_region_and_type_url)
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
  getTripsInfinite(user_id, page, size) {
    return this.httpClient.get(this.trips_infinite_url + user_id + '&list_size=' + size + '&page_no=' + page)
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
  getTripTags(tag, user_id) {
    return this.httpClient.get(this.trips_tags_url + tag + "&user_id=" + user_id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getTripFilter(user_id, type, region) {
    return this.httpClient.get(this.trips_filter_url + user_id + "&trip-type=" + type + "&region=" + region)
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
  getSoloTags(user_id, page, tag) {
    return this.httpClient.get(this.solo_tag_url + user_id + '&paged=' + page + '&tags=' + tag)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getSoloFilters(dateFrom, dateTo) {
    return this.httpClient.get(this.solo_filter_url + dateTo + '&from_date=' + dateFrom)
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
  getVaultInfinite(list_size, page) {
    return this.httpClient.get(this.vault_infinite_url + list_size + '&paged=' + page)
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
  getVaultCategory(category) {
    return this.httpClient.get(this.vault_category_url + category)
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
  getVaultSkillsCategory() {
    return this.httpClient.get(this.vault_skill_category_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getVaultFilters(skill, category) {
    return this.httpClient.get(this.vault_filter_url + skill + '&category=' + category)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getVaultSearch(value) {
    return this.httpClient.get(this.vault_search_url + value)
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
  getMemberSkillsIndustry() {
    return this.httpClient.get(this.member_skills_industry_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMemberSearch(value) {
    return this.httpClient.get(this.member_search_url + value)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMemberMapSearch() {
    return this.httpClient.get(this.member_search_map_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMemberFilter(skill, industry) {
    return this.httpClient.get(this.member_filter_url + skill + '&search_industry=' + industry)
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
  getBusinessSearch(value) {
    return this.httpClient.get(this.business_search_url + value)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getBusinessFilter(skill, category) {
    return this.httpClient.get(this.business_filter_url + skill + '&search_category=' + category)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMentorMatchSkills() {
    return this.httpClient.get(this.mentormatch_skills_url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  submitMentorMatchSkill(skill, details, user_id) {
    return this.httpClient.get(this.mentormatch_submit_url + skill + '&details=' + details + '&user_id=' + user_id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMemberAssist(id,size,page) {
    return this.httpClient.get(this.memberassist_submit_url + id + '&listsize=' + size +'&paged=' + page)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  getMemberAssistFilter(id,skill) {
    return this.httpClient.get(this.memberassist_filter_url + id + '&skill=' + skill)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  respondMemberAssist(user_id, post_id) {
    return this.httpClient.get(this.memberassist_respond_url + user_id + '&post_id=' + post_id)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  enableVault(value) {
    return this.httpClient.get(this.enable_vault_url + value)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  enableMember(value) {
    return this.httpClient.get(this.enable_member_url + value)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }
  enableGetLucky(value) {
    return this.httpClient.get(this.enable_getlucky_url + value)
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
}
