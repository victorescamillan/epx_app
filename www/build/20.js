webpackJsonp([20],{

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessPageModule", function() { return BusinessPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business__ = __webpack_require__(480);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BusinessPageModule = (function () {
    function BusinessPageModule() {
    }
    BusinessPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__business__["a" /* BusinessPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__business__["a" /* BusinessPage */]),
            ],
        })
    ], BusinessPageModule);
    return BusinessPageModule;
}());

//# sourceMappingURL=business.module.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BusinessPage = (function () {
    function BusinessPage(epxProvider, cache, navCtrl, navParams) {
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.totalPage = 0;
        // Set TTL to 12h
        cache.setDefaultTTL(60 * 60 * 12);
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    BusinessPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessPage');
        this.LoadBusiness();
    };
    BusinessPage.prototype.LoadBusiness = function (refresher) {
        var _this = this;
        var url = this.epxProvider.business_infinite_url;
        var ttl = 60 * 60 * 12;
        var delay_type = 'all';
        var groupKey = 'business-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getBusinessInfinite(this.page).subscribe(function (data) {
                var business = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.data);
                _this.totalPage = data.number_of_page;
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, business, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.businessList = Object.keys(data).map(function (key) { return data[key]; });
                        console.log('business:', data);
                        refresher.complete();
                    });
                }
                else {
                    _this.cache.loadFromObservable(url, business, groupKey).subscribe(function (data) {
                        _this.businessList = Object.keys(data).map(function (key) { return data[key]; });
                        console.log('business:', data);
                    });
                }
                _this.isLoading = false;
                _this.isRefresh = true;
            }, function (error) {
                console.log(error);
                refresher.complete();
            });
        }
        else {
            this.epxProvider.getData(url).then(function (data) {
                if (data != null) {
                    var offline_data = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.value);
                    console.log('offline data: ', offline_data);
                    if (refresher) {
                        _this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.businessList = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.businessList = data;
                        });
                    }
                    _this.isLoading = false;
                    _this.isRefresh = true;
                }
                else {
                    console.log('offline data: ', data);
                    refresher.complete();
                }
            });
        }
    };
    BusinessPage.prototype.forceReload = function (refresher) {
        this.LoadBusiness(refresher);
    };
    BusinessPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getBusinessInfinite(this.page + 1).subscribe(function (data) {
            var business = data.data;
            var temp = Object.keys(business).map(function (key) { return business[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.businessList.push(temp[i]);
                console.log(data[i]);
            }
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
            _this.page++;
        }, function (error) {
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    BusinessPage.prototype.filterBusiness = function (ev) {
        if (!this.isLoading) {
            this.businessList = this.temp_businessList;
            var val_1 = ev.target.value;
            if (val_1 && val_1.trim() !== '') {
                this.businessList = this.businessList.map(function (business) { return business.filter(function (item) {
                    return item.business_name.toLowerCase().includes(val_1.toLowerCase());
                }); });
            }
        }
    };
    BusinessPage.prototype.businessDetails = function (business) {
        this.navCtrl.push('BusinessDetailsPage', { data: business });
    };
    BusinessPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-business',template:/*ion-inline-start:"D:\epx_app\src\pages\business\business.html"*/'<!--\n  Generated template for the BusinessPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>BUSINESS</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="card-background-page">\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <br />\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <!-- <ion-searchbar placeholder="Search Business" showCancelButton color="danger" (ionInput)="filterBusiness($event)"></ion-searchbar> -->\n\n  <ion-card *ngFor="let business of businessList" (click)="businessDetails(business)">\n    <div class="business-logo">\n      <img [src]="business.business_logo" />\n    </div>\n    <div class="content-text">\n      <div class="card-title pre-line" [innerHtml]="business.business_name | uppercase"></div>\n      <h2 class="gray pre-line">{{business.member_name}}</h2>\n      <div class="card-subtitle pre-line" [innerHTML]="business.business_industry"></div>\n    </div>\n  </ion-card>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage">\n    <ion-infinite-scroll-content loadingText="Loading more business..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\business\business.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], BusinessPage);
    return BusinessPage;
}());

//# sourceMappingURL=business.js.map

/***/ })

});
//# sourceMappingURL=20.js.map