webpackJsonp([3],{

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TripsPageModule", function() { return TripsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trips__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TripsPageModule = (function () {
    function TripsPageModule() {
    }
    TripsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__trips__["a" /* TripsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__trips__["a" /* TripsPage */]),
            ],
        })
    ], TripsPageModule);
    return TripsPageModule;
}());

//# sourceMappingURL=trips.module.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TripsPage = (function () {
    function TripsPage(httpClient, cache, alertCtrl, toastCtrl, modalCtrl, loadingCtrl, epxProvider, navCtrl, navParams) {
        this.httpClient = httpClient;
        this.cache = cache;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.is_interested = false;
        this.date = new Date().toLocaleString();
        this.isLoading = true;
        this.isRefresh = false;
        this.isInterested = false;
        // Set TTL to 12h
        cache.setDefaultTTL(60 * 60 * 12);
        // Keep our cached results when device is offline!
        // cache.setOfflineInvalidate(false);
    }
    //Filter Page
    TripsPage.prototype.showFilter = function () {
        var filterModal = this.modalCtrl.create('TripFilterPage');
        filterModal.present();
    };
    TripsPage.prototype.logoutUser = function () {
        this.epxProvider.clearUser();
        this.navCtrl.setRoot('LoginPage');
    };
    TripsPage.prototype.tripByTags = function (tag) {
        console.log('tag', tag);
        this.navCtrl.push('TripTagsPage', { data: tag });
    };
    //Get Trips List and show indicator
    TripsPage.prototype.LoadTrips = function (refresher) {
        var _this = this;
        var url = this.epxProvider.trips_url;
        var ttl = 1000;
        var delay_type = 'all';
        var groupKey = 'trip-list';
        this.epxProvider.getData('ID').then(function (user_id) {
            _this.epxProvider.getTrips(user_id).subscribe(function (data) {
                var trips = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(Object.keys(data).map(function (key) { return data[key]; })); //Convert object to array since angular accepts array for iteration
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, trips, groupKey, null, delay_type).subscribe(function (data) {
                        _this.tripList = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data);
                        refresher.complete();
                    });
                }
                else {
                    _this.cache.loadFromObservable(url, trips, groupKey).subscribe(function (data) {
                        _this.tripList = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data);
                    });
                }
                _this.isLoading = false;
                _this.isRefresh = true;
                _this.isInterested = false;
            });
        });
    };
    //Pull to refresh page
    TripsPage.prototype.forceReload = function (refresher) {
        this.LoadTrips(refresher);
    };
    TripsPage.prototype.loadChart = function () {
        console.log('load chart: ', this.doughnutCanvas);
        // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        //   type: 'doughnut',
        //   rotation: 5,
        //   data: {
        //     labels: ["Occupied", "Vacant"],
        //     datasets: [{
        //       label: '# of Votes',
        //       data: [30,5],
        //       backgroundColor: [
        //         'rgba(255, 99, 132, 0.9)',
        //         'rgba(54, 162, 235, 0.2)',
        //         // 'rgba(255, 206, 86, 0.2)',
        //         // 'rgba(75, 192, 192, 0.2)',
        //         // 'rgba(153, 102, 255, 0.2)',
        //         // 'rgba(255, 159, 64, 0.2)'
        //       ],
        //       hoverBackgroundColor: [
        //         "#FF6384",
        //         "#36A2EB",
        //         // "#FFCE56",
        //         // "#FF6384",
        //         // "#36A2EB",
        //         // "#FFCE56"
        //       ],
        //     }]
        //   }
        // });
    };
    //Interested
    TripsPage.prototype.interested = function (trip) {
        var _this = this;
        this.epxProvider.getData('ID').then(function (user_id) {
            if (trip.trip_interested.interested) {
                trip.trip_interested.interested = false;
            }
            else {
                trip.trip_interested.interested = true;
            }
            _this.epxProvider.getTripInterest(trip.ID, user_id).subscribe(function (res) {
                trip.trip_interested.interested = res.interest;
                console.log('interest result:', res);
            });
        });
    };
    TripsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TripsPage');
        this.LoadTrips();
    };
    TripsPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    //Navigate to Trip Details
    TripsPage.prototype.tripDetails = function (trip) {
        this.trip = trip;
        this.navCtrl.push('TripDetailsPage', { data: trip });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('doughnutCanvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], TripsPage.prototype, "doughnutCanvas", void 0);
    TripsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trips',template:/*ion-inline-start:"D:\epx_app\src\pages\trips\trips.html"*/'<!-- <!--\n  Generated template for the TripsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>EXPLORE . EXPAND</ion-title>\n    <!-- <ion-buttons end>\n      <button ion-button icon-only color="light" (click)="showFilter()">\n        <ion-icon name="md-funnel"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <!-- <h1 class="text-center">\n    <strong>EXPLORE . EXPAND</strong>\n  </h1> -->\n  <!-- <ion-buttons>\n    <button ion-button block icon-end (click)="showFilter()">\n      Filter\n      <ion-icon name="search"></ion-icon>\n    </button>\n  </ion-buttons> -->\n  <br />\n\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <!-- <ion-card >\n    <ion-card-content>\n      <canvas #doughnutCanvas></canvas>\n    </ion-card-content>\n  </ion-card> -->\n  <!-- <ion-list [virtualScroll]="(tripList | async)" [approxItemHeight]="\'200px\'"> -->\n  <!-- <ion-list> -->\n  <!-- <ion-card *virtualItem="let trip"> -->\n  <ion-card *ngFor="let trip of tripList | async">\n    <div class="trip-image" (click)="tripDetails(trip)">\n      <button ion-button round outline small class="top">{{trip.product_cat}}</button>\n      <img src="{{trip.thumbnail}}" >\n      <img class="sashes" src="{{trip.sashes_image}}" *ngIf="trip.sashes_image != \'\'">\n      <div class="trip-meter" [style.background-image]="trip.gauge_meter_image" [style.background-position-x]="trip.gauge_meter_css">\n        <p class="sm-text strong white">{{trip.gauge_meter_percent}}</p>\n      </div>\n    </div>\n    <!-- <canvas #doughnutCanvas></canvas> -->\n    <ion-card-content>\n      <p class="sm-text">{{trip.start_date}} - {{trip.end_date}}</p>\n      <h3 class="content-text">\n        <strong>{{trip.title | uppercase}}</strong>\n      </h3>\n      <p class="content-text">\n        <strong class="colored">{{trip.price}}</strong> Trip Fee</p>\n      <div class="btn-interested" *ngIf="trip.sashes_image == \'\'">\n        <button ion-button icon-right clear small (click)="interested(trip)">\n          <div>{{trip.trip_interested.interested ? "Interested" : "I\'m Interested"}}</div>\n          <ion-icon name="{{trip.trip_interested.interested ? \'heart\' : \'heart-outline\'}}"></ion-icon>\n        </button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n  <!-- </ion-list> -->\n\n</ion-content> '/*ion-inline-end:"D:\epx_app\src\pages\trips\trips.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], TripsPage);
    return TripsPage;
}());

//# sourceMappingURL=trips.js.map

/***/ })

});
//# sourceMappingURL=3.js.map