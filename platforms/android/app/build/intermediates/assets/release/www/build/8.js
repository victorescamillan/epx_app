webpackJsonp([8],{

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoloPageModule", function() { return SoloPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solo__ = __webpack_require__(486);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__solo__["a" /* SoloPage */]),
            ],
        })
    ], SoloPageModule);
    return SoloPageModule;
}());

//# sourceMappingURL=solo.module.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SoloPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(284);
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
    function SoloPage(loadingCtrl, epxProvider, cache, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        // Set TTL to 12h
        cache.setDefaultTTL(60 * 60 * 12);
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
        this.LoadSolo();
    }
    SoloPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SoloPage');
    };
    SoloPage.prototype.soloDetails = function (solo) {
        this.navCtrl.push('SoloDetailsPage', { data: solo });
    };
    SoloPage.prototype.LoadSolo = function (refresher) {
        var _this = this;
        var url = this.epxProvider.solo_url;
        var ttl = 1000;
        var delay_type = 'all';
        var groupKey = 'solo-list';
        this.epxProvider.getsolo().subscribe(function (data) {
            var solo = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(Object.keys(data).map(function (key) { return data[key]; })); //Convert object to array since angular accepts array for iteration
            console.log('solo list', solo);
            if (refresher) {
                _this.soloList = _this.cache.loadFromDelayedObservable(url, solo, groupKey, null, delay_type);
                _this.soloList.subscribe(function (data) {
                    refresher.complete();
                });
            }
            else {
                _this.soloList = _this.cache.loadFromObservable(url, solo, groupKey);
            }
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    //Pull to refresh page
    SoloPage.prototype.forceReload = function (refresher) {
        this.LoadSolo(refresher);
    };
    SoloPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-solo',template:/*ion-inline-start:"D:\epx_app\src\pages\solo\solo.html"*/'<!--\n  Generated template for the SoloPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>SOLO</ion-title>\n    <!-- <h1 class="text-center">\n        <strong>SOLO</strong>\n      </h1> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content refreshingText="Loading...">\n    </ion-refresher-content>\n  </ion-refresher>\n  \n  <!-- <ion-buttons>\n    <button ion-button block icon-end (click)="showFilter()">\n      Filter\n      <ion-icon name="search"></ion-icon>\n    </button>\n  </ion-buttons> -->\n  <br />\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}" >\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <!-- <ion-list [virtualScroll]="(soloList | async)" [approxItemHeight]="\'200px\'"> -->\n  <ion-list>\n    <!-- <ion-card *virtualItem="let solo"> -->\n    <ion-card *ngFor="let solo of soloList | async">\n      <img src="{{solo.thumbnail}}" (click)="soloDetails(solo)">\n      <ion-card-content>\n        <h3 class="content-text">\n          <strong>{{solo.title | uppercase}}</strong>\n        </h3>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-2>\n              Date :\n            </ion-col>\n            <ion-col col-10>\n              <p class="content-text">\n                <strong class="colored">Price: {{solo.price}}</strong>\n              </p>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-2>\n              Date :\n            </ion-col>\n            <ion-col col-10>\n              <p class="sm-text">{{solo.start_date}}</p>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-2>\n              Tags :\n            </ion-col>\n            <ion-col col-10>\n              <button ion-button round outline small *ngFor="let tag of solo.product_tag">{{tag}}</button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\solo\solo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], SoloPage);
    return SoloPage;
}());

//# sourceMappingURL=solo.js.map

/***/ })

});
//# sourceMappingURL=8.js.map