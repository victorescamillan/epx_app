webpackJsonp([5],{

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TripsPageModule", function() { return TripsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trips__ = __webpack_require__(500);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__trips__["a" /* TripsPage */]),
            ],
        })
    ], TripsPageModule);
    return TripsPageModule;
}());

//# sourceMappingURL=trips.module.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(286);
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
    function TripsPage(detectorRef, events, cache, alertCtrl, toastCtrl, modalCtrl, loadingCtrl, epxProvider, navCtrl, navParams) {
        this.detectorRef = detectorRef;
        this.events = events;
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
        this.page = 1;
        this.totalPage = 0;
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    //Filter Page
    TripsPage.prototype.showFilter = function () {
        // let filterModal = this.modalCtrl.create('TripFilterPage');
        // filterModal.present();
        this.content.scrollToTop();
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
        var url = this.epxProvider.trips_infinite_url;
        var ttl = 60 * 60 * 12;
        var delay_type = 'all';
        var groupKey = 'trip-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getData('ID').then(function (user_id) {
                _this.epxProvider.getTripsInfinite(user_id, _this.page, _this.epxProvider.PAGE_SIZE).subscribe(function (data) {
                    _this.totalPage = data.number_of_page;
                    var trips = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.data);
                    if (refresher) {
                        _this.cache.loadFromDelayedObservable(url, trips, groupKey, ttl, delay_type).subscribe(function (data) {
                            _this.tripList = Object.keys(data).map(function (key) { return data[key]; });
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, trips, groupKey).subscribe(function (data) {
                            _this.tripList = Object.keys(data).map(function (key) { return data[key]; });
                        });
                    }
                    _this.isLoading = false;
                    _this.isRefresh = true;
                    _this.isInterested = false;
                    _this.epxProvider.updateNotification(_this.epxProvider.TRIP_BADGE);
                }, function (error) {
                    console.log(error);
                    refresher.complete();
                });
            });
        }
        else {
            this.epxProvider.getData(url).then(function (data) {
                if (data != null) {
                    var offline_data = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.value);
                    console.log('offline data: ', offline_data);
                    if (refresher) {
                        _this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.tripList = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.tripList = data;
                        });
                    }
                    _this.isLoading = false;
                    _this.isRefresh = true;
                    _this.isInterested = false;
                }
                else {
                    console.log('offline data: ', data);
                }
            });
        }
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
    //Show badge if there is an update
    TripsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.epxProvider.getData(this.epxProvider.TRIP_BADGE).then(function (badge) {
            if (badge != null && badge > 0) {
                _this.events.publish(_this.epxProvider.TRIP_BADGE, badge);
            }
        });
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
        //this.trip = trip;
        this.navCtrl.push('TripDetailsPage', { data: trip });
    };
    TripsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getData('ID').then(function (user_id) {
            _this.epxProvider.getTripsInfinite(user_id, _this.page + 1, _this.epxProvider.PAGE_SIZE).subscribe(function (data) {
                var trips = data.data;
                var temp = Object.keys(trips).map(function (key) { return trips[key]; });
                for (var i = 0; i < temp.length; i++) {
                    _this.tripList.push(temp[i]);
                }
                _this.isLoading = false;
                _this.isRefresh = true;
                infiniteScroll.complete();
                _this.page++;
                console.log('current page: ', _this.page);
            }, function (error) {
                _this.isLoading = false;
                _this.isRefresh = true;
                infiniteScroll.complete();
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('doughnutCanvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], TripsPage.prototype, "doughnutCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], TripsPage.prototype, "content", void 0);
    TripsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trips',template:/*ion-inline-start:"D:\epx_app\src\pages\trips\trips.html"*/'<!-- <!--\n  Generated template for the TripsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>EXPLORE . EXPAND. EVOLVE.</ion-title>\n    <!-- <ion-buttons end>\n      <button ion-button icon-only color="light" (click)="showFilter()">\n        <ion-icon name="md-funnel"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <!-- <h1 class="text-center">\n    <strong>EXPLORE . EXPAND</strong>\n  </h1> -->\n  <!-- <ion-buttons>\n    <button ion-button block icon-end (click)="showFilter()">\n      Filter\n      <ion-icon name="search"></ion-icon>\n    </button>\n  </ion-buttons> -->\n  <br />\n\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <ion-card *ngFor="let trip of tripList" #tripCard>\n    <div class="trip-image" (click)="tripDetails(trip)">\n      \n      <img src="{{trip.thumbnail}}" >\n      \n      <img class="sashes" src="{{trip.sashes_image}}" *ngIf="trip.sashes_image != \'\'">\n      <div class="trip-meter" [style.background-image]="trip.gauge_meter_image" [style.background-position-x]="trip.gauge_meter_css">\n        <p class="sm-text strong white">{{trip.gauge_meter_percent}}</p>\n      </div>\n      <button ion-button round outline small class="btn-category">{{trip.product_cat}} </button>\n    </div>\n   \n    <ion-card-content>\n      <p class="sm-text">{{trip.start_date}} - {{trip.end_date}}</p>\n      <h3 class="content-text">\n        <strong class="pre-line" [innerHtml]="trip.title | uppercase"></strong>\n      </h3>\n      <p class="content-text">\n        <strong class="colored">{{trip.price}}</strong> Trip Fee</p>\n      <div class="btn-interested" *ngIf="trip.sashes_image == \'\'">\n        <button ion-button icon-right clear small (click)="interested(trip)">\n          <div>{{trip.trip_interested.interested ? "Interested" : "I\'m Interested"}}</div>\n          <ion-icon name="{{trip.trip_interested.interested ? \'heart\' : \'heart-outline\'}}"></ion-icon>\n        </button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage">\n    <ion-infinite-scroll-content loadingText="Loading more trips..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content> '/*ion-inline-end:"D:\epx_app\src\pages\trips\trips.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TripsPage);
    return TripsPage;
}());

//# sourceMappingURL=trips.js.map

/***/ })

});
//# sourceMappingURL=5.js.map