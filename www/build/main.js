webpackJsonp([18],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EpxProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the EpxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EpxProvider = (function () {
    function EpxProvider(storage, httpClient) {
        this.storage = storage;
        this.httpClient = httpClient;
        // LOGIN
        this.login_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=user_logged_in&';
        // TRIPS
        this.trips_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips&user_id=';
        this.trips_details_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trips-single-page&trip_id=';
        this.trips_interest_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-interest&trip_id=';
        this.trips_filter_url = 'http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=trip-filter&user_id=295&trip-type=nature';
        // SOLO
        this.solo_url = 'http://dev.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo';
        this.solo_filter_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=solo-filter&to_date=03/31/2018&from_date=03/06/2018';
        // VAULT
        this.vault_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault';
        this.vault_details_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=vault-details&vault-id=';
        // MEMBERS
        this.members_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=members';
        this.member_details_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=member-details&user_id=';
        // BUSINESS
        this.business_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business';
        this.business_details_url = 'http://www.epxworldwide.com/JSON%20API/epx-json-data.php?request=business-details&business-id=';
    }
    EpxProvider.prototype.getLogin = function (username, password) {
        return this.httpClient.get(this.login_url + 'username=' + username + '&password=' + password)
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
    EpxProvider.prototype.getTripDetails = function (id) {
        return this.httpClient.get(this.trips_details_url + id)
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
    EpxProvider.prototype.getVault = function () {
        return this.httpClient.get(this.vault_url)
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
        return this.getData('ID').then(function (data) {
            // console.log('login details', data);
            // return data && data !== -1;
            if (data == null) {
                return false;
            }
            else {
                return true;
            }
        });
    };
    EpxProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], EpxProvider);
    return EpxProvider;
}());

//# sourceMappingURL=epx.js.map

/***/ }),

/***/ 151:
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
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/assist/assist.module": [
		453,
		17
	],
	"../pages/business-details/business-details.module": [
		454,
		16
	],
	"../pages/business/business.module": [
		455,
		15
	],
	"../pages/chat/chat.module": [
		458,
		14
	],
	"../pages/login/login.module": [
		456,
		13
	],
	"../pages/member-details/member-details.module": [
		463,
		12
	],
	"../pages/members/members.module": [
		461,
		11
	],
	"../pages/mentor/mentor.module": [
		457,
		10
	],
	"../pages/menu/menu.module": [
		460,
		9
	],
	"../pages/notification/notification.module": [
		459,
		8
	],
	"../pages/solo-details/solo-details.module": [
		466,
		7
	],
	"../pages/solo/solo.module": [
		465,
		6
	],
	"../pages/tabs/tabs.module": [
		462,
		5
	],
	"../pages/trip-details/trip-details.module": [
		467,
		4
	],
	"../pages/trip-filter/trip-filter.module": [
		464,
		3
	],
	"../pages/trips/trips.module": [
		468,
		2
	],
	"../pages/vault-details/vault-details.module": [
		469,
		1
	],
	"../pages/vault/vault.module": [
		470,
		0
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
webpackAsyncContext.id = 193;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(306);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_push__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_epx_epx__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_cache__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_search_members_search_members__ = __webpack_require__(452);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { Geolocation } from '@ionic-native/geolocation';










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
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pipes_search_members_search_members__["a" /* SearchMembersPipe */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/assist/assist.module#AssistPageModule', name: 'AssistPage', segment: 'assist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/business-details/business-details.module#BusinessDetailsPageModule', name: 'BusinessDetailsPage', segment: 'business-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/business/business.module#BusinessPageModule', name: 'BusinessPage', segment: 'business', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mentor/mentor.module#MentorPageModule', name: 'MentorPage', segment: 'mentor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/members/members.module#MembersPageModule', name: 'MembersPage', segment: 'members', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/member-details/member-details.module#MemberDetailsPageModule', name: 'MemberDetailsPage', segment: 'member-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trip-filter/trip-filter.module#TripFilterPageModule', name: 'TripFilterPage', segment: 'trip-filter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/solo/solo.module#SoloPageModule', name: 'SoloPage', segment: 'solo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/solo-details/solo-details.module#SoloDetailsPageModule', name: 'SoloDetailsPage', segment: 'solo-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trip-details/trip-details.module#TripDetailsPageModule', name: 'TripDetailsPage', segment: 'trip-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trips/trips.module#TripsPageModule', name: 'TripsPage', segment: 'trips', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vault-details/vault-details.module#VaultDetailsPageModule', name: 'VaultDetailsPage', segment: 'vault-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vault/vault.module#VaultPageModule', name: 'VaultPage', segment: 'vault', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_13_ionic_cache__["a" /* CacheModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_epx_epx__["a" /* EpxProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__["a" /* GoogleMaps */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_epx_epx__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(epxProvider, platform, statusBar, splashScreen) {
        var _this = this;
        this.epxProvider = epxProvider;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.epxProvider.isLogin().then(function (user) {
                if (user) {
                    _this.rootPage = 'MenuPage';
                }
                else {
                    _this.rootPage = 'LoginPage';
                }
            });
            statusBar.overlaysWebView(true);
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\epx_app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\epx_app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchMembersPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the SearchMembersPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SearchMembersPipe = (function () {
    function SearchMembersPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    // transform(value: string, ...args) {
    //   return value.toLowerCase();
    // }
    SearchMembersPipe.prototype.transform = function (items, terms) {
        if (!items)
            return [];
        if (!terms)
            return items;
        terms = terms.toLowerCase();
        return items.map(function (member) { return member.filter(function (it) {
            return it.name.toLowerCase().includes(terms); // only filter country name
        }); });
    };
    SearchMembersPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'searchMembers',
        })
    ], SearchMembersPipe);
    return SearchMembersPipe;
}());

//# sourceMappingURL=search-members.js.map

/***/ })

},[286]);
//# sourceMappingURL=main.js.map