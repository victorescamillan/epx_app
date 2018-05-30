webpackJsonp([1],{

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TripsPageModule", function() { return TripsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trips__ = __webpack_require__(351);
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

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(5);
var of_1 = __webpack_require__(211);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(210);
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
    function TripsPage(renderer, events, cache, alertCtrl, toastCtrl, modalCtrl, epxProvider, navCtrl, navParams) {
        this.renderer = renderer;
        this.events = events;
        this.cache = cache;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oldScrollTop = 0;
        this.is_interested = false;
        this.date = new Date().toLocaleString();
        this.isLoading = true;
        this.isRefresh = false;
        this.isInterested = false;
        this.page = 1;
        this.totalPage = 0;
        this.isFilter = false;
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    TripsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TripsPage');
        this.LoadTrips();
        this.initFilterData();
    };
    //Filter Page
    TripsPage.prototype.showFilter = function () {
        var assist = this.modalCtrl.create('AssistPage', { isNotification: true });
        assist.present();
        // this.content.scrollToTop();
    };
    TripsPage.prototype.initFilterData = function () {
        var _this = this;
        this.region = '';
        this.type = '';
        this.epxProvider.getTripRegionAndType().subscribe(function (res) {
            console.log('product type', res.product_cat);
            _this.product_typeList = res.product_cat;
            console.log('product region', res.product_region);
            _this.regionList = res.product_region;
        });
    };
    TripsPage.prototype.scrollFunction = function () {
        console.log('scrollFunction');
    };
    TripsPage.prototype.filterTrips = function () {
        var _this = this;
        console.log('region and type:', this.region, this.type);
        if (this.region === '' && this.type === '' || this.region === undefined && this.type === undefined) {
            this.epxProvider.toastMessage('Please select region or trip type.');
            return;
        }
        this.isFilter = true;
        this.isLoading = true;
        this.isRefresh = false;
        this.epxProvider.getData('ID').then(function (user_id) {
            _this.epxProvider.getTripFilter(user_id, _this.type, _this.region).subscribe(function (res) {
                console.log('filter result: ', res);
                if (res.result === true) {
                    var trips = Object.keys(res.data).map(function (key) { return res.data[key]; });
                    _this.tripList = trips;
                }
                else {
                    _this.epxProvider.toastMessage('No results found!');
                }
                _this.isLoading = false;
            }, function (error) {
                console.log('error: ', error);
                _this.epxProvider.toastMessage('Internal error!');
                _this.isLoading = false;
            });
            setTimeout(function () {
                _this.isLoading = false;
            }, 20000);
        });
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
        var ttl = this.epxProvider.TTL;
        var delay_type = this.epxProvider.DELAY_TYPE;
        var groupKey = 'trip-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getData('ID').then(function (user_id) {
                _this.epxProvider.getTripsInfinite(user_id, _this.page, _this.epxProvider.PAGE_SIZE10).subscribe(function (res) {
                    console.log('getTripsInfinite', res.data);
                    _this.totalPage = res.number_of_page;
                    var trips = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(res.data);
                    if (refresher) {
                        _this.initFilterData();
                        _this.cache.loadFromDelayedObservable(url, trips, groupKey, ttl, delay_type).subscribe(function (data) {
                            _this.tripList = Object.keys(data).map(function (key) { return data[key]; });
                            refresher.complete();
                            _this.isFilter = false;
                        });
                    }
                    else {
                        _this.cache.loadFromDelayedObservable(url, trips, groupKey, ttl, delay_type).subscribe(function (data) {
                            _this.tripList = Object.keys(data).map(function (key) { return data[key]; });
                        });
                    }
                    _this.isLoading = false;
                    _this.isRefresh = true;
                    _this.isInterested = false;
                    _this.epxProvider.updateNotification(_this.epxProvider.TRIP_BADGE);
                }, function (error) {
                    console.log(error);
                    _this.epxProvider.toastMessage('Trips Internal Error!');
                    _this.isLoading = false;
                });
            });
        }
        else {
            this.epxProvider.getData(url).then(function (data) {
                if (data != null) {
                    var offline_data = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.value);
                    console.log('offline data: ', offline_data);
                    if (refresher) {
                        _this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(function (data) {
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
    //Interested
    TripsPage.prototype.interested = function (trip) {
        var _this = this;
        this.epxProvider.getData('ID').then(function (user_id) {
            trip.trip_interested.isTapped = true;
            _this.epxProvider.getTripInterest(trip.ID, user_id).subscribe(function (res) {
                trip.trip_interested.interested = res.interest;
                trip.trip_interested.isTapped = false;
                console.log('interest result:', res);
            });
        });
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
        console.log('trip data', trip);
        var data = {
            ID: trip.ID,
            isInterested: trip.trip_interested.interested,
            sashes_image: trip.sashes_image,
            location: trip.map_info.map_address,
            lat: Number(trip.map_info.map_latitude),
            lng: Number(trip.map_info.map_longitude),
            product_cat: trip.product_cat,
            title: trip.title,
            trip_gallery: trip.trip_gallery,
            full_content: trip.full_content
        };
        this.navCtrl.push('TripDetailsPage', { data: data, trip: trip });
    };
    TripsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getData('ID').then(function (user_id) {
            _this.epxProvider.getTripsInfinite(user_id, _this.page + 1, _this.epxProvider.PAGE_SIZE10).subscribe(function (data) {
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
    TripsPage.prototype.ionSelected = function () {
        console.log('trip selected');
        this.topDistance = this.content.getContentDimensions().scrollTop;
        console.log('scroll top', this.topDistance);
        if (this.topDistance > 10) {
            this.content.scrollToTop();
        }
    };
    TripsPage.prototype.onScroll = function (event) {
        console.log('filter', this.filter);
        if (event.scrollTop - this.oldScrollTop > 10) {
            // if(className != 'filter hide-filter'){
            //   this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
            // }
            this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
            console.log('scroll down', event.scrollTop - this.oldScrollTop);
        }
        else if (event.scrollTop - this.oldScrollTop < 0) {
            // if(className != 'filter'){
            //   this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
            // }
            this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
            console.log('scroll up', event.scrollTop - this.oldScrollTop);
        }
        this.oldScrollTop = event.scrollTop;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], TripsPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('filter'),
        __metadata("design:type", Object)
    ], TripsPage.prototype, "filter", void 0);
    TripsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trips',template:/*ion-inline-start:"D:\epx_app\src\pages\trips\trips.html"*/'<!-- <!--\n  Generated template for the TripsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>EXPLORE . EXPAND . EVOLVE .</ion-title>\n    <!-- <ion-buttons end>\n      <button ion-button icon-only color="light" (click)="showFilter()">\n        <ion-icon isActive="true" name="search"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n<ion-content (ionScroll)="onScroll($event)">\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n  <div class="filter" #filter>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Region\n          </ion-label>\n          <ion-select [(ngModel)]="region">\n            <ion-option *ngFor="let item of regionList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Trip Type\n          </ion-label>\n          <ion-select [(ngModel)]="type">\n            <ion-option *ngFor="let item of product_typeList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button outline color="light" class="btn-search" (click)="filterTrips()">\n          Update\n        </button>\n      </ion-col>\n    </ion-row>\n  </div>\n  <div id="indicator" class="{{isLoading ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <ion-card *ngFor="let trip of tripList">\n    <div class="trip-image" (click)="tripDetails(trip)">\n\n      <img src="{{trip.thumbnail}}">\n\n      <img class="sashes" src="{{trip.sashes_image}}" *ngIf="trip.sashes_image != \'\'">\n      <div class="trip-meter" [style.background-image]="trip.gauge_meter_image" [style.background-position-x]="trip.gauge_meter_css">\n        <p class="sm-text strong white">{{trip.gauge_meter_percent}}</p>\n      </div>\n      <button ion-button round outline small class="btn-category">{{trip.product_cat}} </button>\n    </div>\n\n    <ion-card-content>\n      <p class="sm-text">{{trip.start_date}} - {{trip.end_date}}</p>\n      <h3 class="content-text">\n        <strong class="pre-line" [innerHtml]="trip.title | uppercase"></strong>\n      </h3>\n      <p class="content-text">\n        <strong class="colored">{{trip.price}}</strong> Trip Fee</p>\n      <div class="btn-interested" *ngIf="trip.sashes_image == \'\'">\n        <button ion-button icon-right clear small (click)="interested(trip)">\n          <div>{{trip.trip_interested.interested ? "Interested" : "I\'m Interested"}}</div>\n          <!-- <div>{{trip.trip_interested.interested}}</div> -->\n          <ion-icon *ngIf="!trip.trip_interested.isTapped" name="{{trip.trip_interested.interested ? \'heart\' : \'heart-outline\'}}"></ion-icon>\n          <ion-spinner *ngIf="trip.trip_interested.isTapped" class="process" name="crescent"></ion-spinner>\n        </button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage && !isFilter">\n    <ion-infinite-scroll-content loadingText="Loading more trips..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\trips\trips.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TripsPage);
    return TripsPage;
}());

//# sourceMappingURL=trips.js.map

/***/ })

});
//# sourceMappingURL=1.js.map