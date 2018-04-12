webpackJsonp([11],{

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoloPageModule", function() { return SoloPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solo__ = __webpack_require__(491);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SoloPageModule = (function () {
    function SoloPageModule() {
    }
    SoloPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__solo__["a" /* SoloPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__solo__["a" /* SoloPage */]),
            ],
        })
    ], SoloPageModule);
    return SoloPageModule;
}());

//# sourceMappingURL=solo.module.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SoloPage; });
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





var SoloPage = (function () {
    function SoloPage(events, loadingCtrl, epxProvider, cache, navCtrl, navParams) {
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.perPage = 0;
        this.totalData = 0;
        this.totalPage = 0;
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    SoloPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.epxProvider.getData(this.epxProvider.SOLO_BADGE).then(function (badge) {
            if (badge != null && badge > 0) {
                _this.events.publish(_this.epxProvider.SOLO_BADGE, badge);
            }
        });
    };
    SoloPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SoloPage');
        this.LoadSolo();
    };
    SoloPage.prototype.soloDetails = function (solo) {
        this.navCtrl.push('SoloDetailsPage', { data: solo });
    };
    SoloPage.prototype.LoadSolo = function (refresher) {
        var _this = this;
        var url = this.epxProvider.solo_infinite_url;
        var ttl = 60 * 60 * 12;
        var delay_type = 'all';
        var groupKey = 'solo-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getSoloInfinite(this.page).subscribe(function (data) {
                _this.totalPage = data.number_of_page;
                var solo = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.data);
                console.log('totalPage', _this.totalPage);
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, solo, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.soloList = Object.keys(data).map(function (key) { return data[key]; });
                        refresher.complete();
                    });
                }
                else {
                    _this.cache.loadFromObservable(url, solo, groupKey).subscribe(function (data) {
                        _this.soloList = Object.keys(data).map(function (key) { return data[key]; });
                    });
                }
                _this.isLoading = false;
                _this.isRefresh = true;
                _this.epxProvider.updateTripNotification(_this.epxProvider.SOLO_BADGE);
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
                            _this.soloList = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.soloList = data;
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
    SoloPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getSoloInfinite(this.page + 1).subscribe(function (data) {
            var solo = data.data;
            var temp = Object.keys(solo).map(function (key) { return solo[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.soloList.push(temp[i]);
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
    //Pull to refresh page
    SoloPage.prototype.forceReload = function (refresher) {
        this.LoadSolo(refresher);
    };
    SoloPage.prototype.soloByTags = function (tag) {
        console.log('tag', tag);
        this.navCtrl.push('SoloTagsPage', { data: tag });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], SoloPage.prototype, "content", void 0);
    SoloPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-solo',template:/*ion-inline-start:"D:\epx_app\src\pages\solo\solo.html"*/'<!--\n  Generated template for the SoloPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>SOLO</ion-title>\n    <!-- <h1 class="text-center">\n        <strong>SOLO</strong>\n      </h1> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <!-- <ion-buttons>\n    <button ion-button block icon-end (click)="showFilter()">\n      Filter\n      <ion-icon name="search"></ion-icon>\n    </button>\n  </ion-buttons> -->\n  <br />\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <ion-card *ngFor="let solo of soloList">\n    <div class="solo-image">\n        <img src="{{solo.thumbnail}}" (click)="soloDetails(solo)">\n    </div>\n    <ion-card-content>\n      <h2 class="content-text">\n        <strong class="pre-line" [innerHtml]="solo.title | uppercase"></strong>\n      </h2>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            Price : \n          </ion-col>\n          <ion-col col-10>\n            <p class="content-text">\n              <strong class="text-price">{{solo.price}}</strong>\n            </p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-2>\n            Date :\n          </ion-col>\n          <ion-col col-10>\n            <p class="sm-text">{{solo.start_date}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row *ngIf="solo.product_tag.length">\n          <ion-col col-2>\n            Tags :\n          </ion-col>\n          <ion-col col-10>\n            <button class="btn-tags" ion-button round outline small *ngFor="let tag of solo.product_tag" (click)="soloByTags(tag)">{{tag}}</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage">\n    <ion-infinite-scroll-content loadingText="Loading more solo..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\solo\solo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SoloPage);
    return SoloPage;
}());

//# sourceMappingURL=solo.js.map

/***/ })

});
//# sourceMappingURL=11.js.map