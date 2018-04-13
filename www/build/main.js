webpackJsonp([24],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EpxProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// import { CacheService } from "ionic-cache";
/*
  Generated class for the EpxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EpxProvider = (function () {
    function EpxProvider(events, toastCtrl, network, storage, httpClient) {
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.storage = storage;
        this.httpClient = httpClient;
        // LOGIN
        this.login_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=user_logged_in&';
        this.forgot_password_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=reset-password&user-login=';
        // TRIPS
        this.trips_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips&user_id=';
        this.trips_infinite_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-test-pagination&user_id=';
        this.trips_details_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips-single-page&trip_id=';
        this.trips_interest_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-interest&trip_id=';
        this.trips_tags_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-tags&tag=';
        this.trips_filter_url = 'https://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-filter&user_id=295&trip-type=nature';
        // SOLO
        this.solo_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo';
        this.solo_infinite_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-with-pagination&paged=';
        this.solo_tag_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-tags-with-pagination&user_id=';
        this.solo_filter_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-filter&to_date=03/31/2018&from_date=03/06/2018';
        // VAULT
        this.vault_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault';
        this.vault_infinite_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-with-pagination&list_size';
        this.vault_tag_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-tags&tag=';
        this.vault_category_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-cat-with-pagination&paged=1&cat=';
        this.vault_details_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-details&vault-id=';
        // MEMBERS
        this.members_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=members';
        this.member_infinite_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=members-with-pagination&paged=';
        this.member_details_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-details&user_id=';
        // BUSINESS
        this.business_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business';
        this.business_infinite_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-with-pagination&paged=';
        this.business_details_url = 'https://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-details&business-id=';
        this.TRIP_BADGE = "TRIP_BADGE";
        this.SOLO_BADGE = "SOLO_BADGE";
        this.PAGE_SIZE = 10;
        this.checkConnection();
    }
    EpxProvider.prototype.updateTripNotification = function (name) {
        var _this = this;
        this.saveData(name, 0).then(function () {
            _this.events.publish(name, 0);
        });
    };
    EpxProvider.prototype.getNotification = function () {
        var _this = this;
        this.getData(this.TRIP_BADGE).then(function (badge) {
            if (badge != null && badge > 0) {
                console.log('trip badge: ', badge);
                _this.events.publish(_this.TRIP_BADGE, badge);
            }
        });
        this.getData(this.SOLO_BADGE).then(function (badge) {
            if (badge != null && badge > 0) {
                console.log('trip badge: ', badge);
                _this.events.publish(_this.SOLO_BADGE, badge);
            }
        });
    };
    EpxProvider.prototype.isConnected = function () {
        var connection_type = this.network.type;
        return connection_type !== 'unknown' && connection_type !== 'none';
    };
    EpxProvider.prototype.checkConnection = function () {
        this.network.onConnect().subscribe(function (data) {
            console.log(data);
            // this.displayNetworkUpdate(data.type);
        }, function (error) { return console.error(error); });
        this.network.onDisconnect().subscribe(function (data) {
            console.log(data);
            // this.displayNetworkUpdate(data.type);
        }, function (error) { return console.error(error); });
    };
    EpxProvider.prototype.displayNetworkUpdate = function (connectionState) {
        this.saveData('CONNECTION', connectionState);
        var networkType = this.network.type;
        this.toastCtrl.create({
            message: 'You are now ' + connectionState + ' via ' + networkType,
            duration: 3000
        }).present();
    };
    EpxProvider.prototype.getLogin = function (username, password) {
        return this.httpClient.get(this.login_url + 'username=' + username + '&password=' + password)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.requestForgotPassword = function (email) {
        return this.httpClient.get(this.forgot_password_url + email)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getTrips = function (user_id) {
        return this.httpClient.get(this.trips_url + user_id)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getTripsInfinite = function (user_id, page, size) {
        return this.httpClient.get(this.trips_infinite_url + user_id + '&list_size=' + size + '&page_no=' + page)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getTripDetails = function (id) {
        return this.httpClient.get(this.trips_details_url + id)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getTripTags = function (tag, user_id) {
        return this.httpClient.get(this.trips_tags_url + tag + "&user_id=" + user_id)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getTripInterest = function (trip_id, user_id) {
        return this.httpClient.get(this.trips_interest_url + trip_id + '&user_id=' + user_id)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getsolo = function () {
        return this.httpClient.get(this.solo_url)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getSoloTags = function (user_id, page, tag) {
        return this.httpClient.get(this.solo_tag_url + user_id + '&paged=' + page + '&tags=' + tag)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getSoloInfinite = function (page) {
        return this.httpClient.get(this.solo_infinite_url + page)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getVault = function () {
        return this.httpClient.get(this.vault_url)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getVaultInfinite = function (list_size, page) {
        return this.httpClient.get(this.vault_infinite_url + list_size + '&paged=' + page)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getVaultTags = function (tag) {
        return this.httpClient.get(this.vault_tag_url + tag)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getVaultCategory = function (category) {
        return this.httpClient.get(this.vault_category_url + category)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getVaultDetails = function (id) {
        return this.httpClient.get(this.vault_details_url + id)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getMembers = function () {
        return this.httpClient.get(this.members_url)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getMembersInfinite = function (page) {
        return this.httpClient.get(this.member_infinite_url + page)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getMemberDetails = function (user_id) {
        return this.httpClient.get(this.member_details_url + user_id)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getBusiness = function () {
        return this.httpClient.get(this.business_url)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getBusinessInfinite = function (page) {
        return this.httpClient.get(this.business_infinite_url + page)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.getBusinessDetails = function (id) {
        return this.httpClient.get(this.business_details_url + id)
            .do(this.logResponse)
            .map(this.extractData)
            .catch(this.catchError);
    };
    EpxProvider.prototype.catchError = function (error) {
        console.log(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || "Server Error.");
    };
    EpxProvider.prototype.logResponse = function (res) {
        console.log(res);
    };
    EpxProvider.prototype.extractData = function (res) {
        return res;
    };
    EpxProvider.prototype.saveData = function (name, value) {
        return this.storage.set(name, value);
    };
    EpxProvider.prototype.getData = function (key) {
        return this.storage.get(key);
    };
    EpxProvider.prototype.removeData = function (name) {
        return this.storage.remove(name);
    };
    EpxProvider.prototype.clearUser = function () {
        this.storage.clear().then(function () {
            console.log('all keys are cleared.');
        });
    };
    EpxProvider.prototype.isLoaded = function (name) {
        return this.getData('name').then(function (data) {
            if (data == null) {
                return false;
            }
            else {
                return true;
            }
        });
    };
    EpxProvider.prototype.isLogin = function () {
        var res = true;
        this.getData('ID').then(function (data) {
            console.log('islogin', data);
            res = (data == null);
        });
        return res;
    };
    EpxProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], EpxProvider);
    return EpxProvider;
}());

//# sourceMappingURL=epx.js.map

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/assist/assist.module": [
		463,
		23
	],
	"../pages/business-details/business-details.module": [
		454,
		22
	],
	"../pages/business/business.module": [
		455,
		21
	],
	"../pages/chat/chat.module": [
		456,
		20
	],
	"../pages/forgot-password/forgot-password.module": [
		458,
		0
	],
	"../pages/login/login.module": [
		457,
		19
	],
	"../pages/member-details/member-details.module": [
		459,
		18
	],
	"../pages/members/members.module": [
		460,
		17
	],
	"../pages/mentor/mentor.module": [
		461,
		16
	],
	"../pages/menu/menu.module": [
		462,
		15
	],
	"../pages/notification/notification.module": [
		477,
		14
	],
	"../pages/settings/settings.module": [
		464,
		13
	],
	"../pages/solo-details/solo-details.module": [
		465,
		12
	],
	"../pages/solo-tags/solo-tags.module": [
		466,
		11
	],
	"../pages/solo/solo.module": [
		470,
		10
	],
	"../pages/tabs/tabs.module": [
		467,
		9
	],
	"../pages/trip-details/trip-details.module": [
		468,
		8
	],
	"../pages/trip-filter/trip-filter.module": [
		469,
		7
	],
	"../pages/trip-tags/trip-tags.module": [
		471,
		6
	],
	"../pages/trips/trips.module": [
		472,
		5
	],
	"../pages/vault-category/vault-category.module": [
		473,
		4
	],
	"../pages/vault-details/vault-details.module": [
		475,
		3
	],
	"../pages/vault-tags/vault-tags.module": [
		474,
		2
	],
	"../pages/vault/vault.module": [
		476,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 191;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(309);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_cache__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_onesignal__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { Geolocation } from '@ionic-native/geolocation';
// import { GoogleMaps } from '@ionic-native/google-maps';









var config = {
    apiKey: "AIzaSyD9l4jYr1CsW9LRaDWrwkcjc79amz97_JA",
    authDomain: "phoenix-dev-181002.firebaseapp.com",
    databaseURL: "https://phoenix-dev-181002.firebaseio.com",
    projectId: "phoenix-dev-181002",
    storageBucket: "phoenix-dev-181002.appspot.com",
    messagingSenderId: "462345808165"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/business-details/business-details.module#BusinessDetailsPageModule', name: 'BusinessDetailsPage', segment: 'business-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/business/business.module#BusinessPageModule', name: 'BusinessPage', segment: 'business', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/member-details/member-details.module#MemberDetailsPageModule', name: 'MemberDetailsPage', segment: 'member-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/members/members.module#MembersPageModule', name: 'MembersPage', segment: 'members', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mentor/mentor.module#MentorPageModule', name: 'MentorPage', segment: 'mentor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/assist/assist.module#AssistPageModule', name: 'AssistPage', segment: 'assist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/solo-details/solo-details.module#SoloDetailsPageModule', name: 'SoloDetailsPage', segment: 'solo-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/solo-tags/solo-tags.module#SoloTagsPageModule', name: 'SoloTagsPage', segment: 'solo-tags', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trip-details/trip-details.module#TripDetailsPageModule', name: 'TripDetailsPage', segment: 'trip-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trip-filter/trip-filter.module#TripFilterPageModule', name: 'TripFilterPage', segment: 'trip-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/solo/solo.module#SoloPageModule', name: 'SoloPage', segment: 'solo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trip-tags/trip-tags.module#TripTagsPageModule', name: 'TripTagsPage', segment: 'trip-tags', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trips/trips.module#TripsPageModule', name: 'TripsPage', segment: 'trips', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vault-category/vault-category.module#VaultCategoryPageModule', name: 'VaultCategoryPage', segment: 'vault-category', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vault-tags/vault-tags.module#VaultTagsPageModule', name: 'VaultTagsPage', segment: 'vault-tags', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vault-details/vault-details.module#VaultDetailsPageModule', name: 'VaultDetailsPage', segment: 'vault-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vault/vault.module#VaultPageModule', name: 'VaultPage', segment: 'vault', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ionic_cache__["a" /* CacheModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_epx_epx__["a" /* EpxProvider */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__["a" /* Network */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_epx_epx__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { Push, PushObject, PushOptions } from '@ionic-native/push';
var MyApp = (function () {
    function MyApp(epxProvider, platform, statusBar, splashScreen) {
        var _this = this;
        this.epxProvider = epxProvider;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (_this.epxProvider.isLogin()) {
                _this.rootPage = 'MenuPage';
            }
            else {
                _this.rootPage = 'LoginPage';
            }
            statusBar.overlaysWebView(true);
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\epx_app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\epx_app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[289]);
//# sourceMappingURL=main.js.map