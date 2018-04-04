webpackJsonp([0],{

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VaultPageModule", function() { return VaultPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vault__ = __webpack_require__(495);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VaultPageModule = (function () {
    function VaultPageModule() {
    }
    VaultPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vault__["a" /* VaultPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vault__["a" /* VaultPage */]),
            ],
        })
    ], VaultPageModule);
    return VaultPageModule;
}());

//# sourceMappingURL=vault.module.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VaultPage; });
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





var VaultPage = (function () {
    function VaultPage(loadingCtrl, epxProvider, cache, navCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.perPage = 0;
        this.totalData = 0;
        this.totalPage = 0;
        // Set TTL to 12h
        cache.setDefaultTTL(60 * 60 * 12);
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    VaultPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VaultPage');
        this.LoadVault();
    };
    VaultPage.prototype.vaultDetails = function (vault) {
        this.navCtrl.push('VaultDetailsPage', { data: vault });
    };
    VaultPage.prototype.LoadVault = function (refresher) {
        var _this = this;
        var url = this.epxProvider.vault_infinite_url;
        // let ttl = 1000;
        // let delay_type = 'all';
        var groupKey = 'vault-list';
        this.page = 1;
        this.epxProvider.getVaultInfinite(this.page).subscribe(function (data) {
            var vault = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.vaults);
            _this.totalPage = data.number_of_page;
            console.log('vault list', vault);
            if (refresher) {
                _this.cache.loadFromDelayedObservable(url, vault, groupKey).subscribe(function (data) {
                    _this.vaultList = Object.keys(data).map(function (key) { return data[key]; });
                    refresher.complete();
                });
            }
            else {
                _this.cache.loadFromObservable(url, vault, groupKey).subscribe(function (data) {
                    _this.vaultList = Object.keys(data).map(function (key) { return data[key]; });
                });
            }
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    //Pull to refresh page
    VaultPage.prototype.forceReload = function (refresher) {
        this.LoadVault(refresher);
    };
    VaultPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getVaultInfinite(this.page + 1).subscribe(function (data) {
            var vault = data.vaults;
            var temp = Object.keys(vault).map(function (key) { return vault[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.vaultList.push(temp[i]);
            }
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
            _this.page++;
            console.log('current page: ', _this.page);
        });
    };
    VaultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vault',template:/*ion-inline-start:"D:\epx_app\src\pages\vault\vault.html"*/'<!--\n  Generated template for the VaultPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>THE VAULT</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content overflow-scroll="true">\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content refreshingText="Refreshing...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <br />\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}" >\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  \n  <!-- <ion-list [virtualScroll]="(vaultList | async)" [approxItemHeight]="\'20px\'"> -->\n  <ion-list>\n    <!-- <ion-card *virtualItem="let vault"> -->\n    <ion-card *ngFor="let vault of vaultList">\n      <img [src]="vault.thumbnail" (click)="vaultDetails(vault)" class="{{vault.vault_type == \'video\' ? \'video\' : \'pdf\'}}" >\n      <ion-card-content>\n        <h3 class="content-text xl-text strong blue">\n          {{vault.title | uppercase}}\n        </h3>\n        <ion-item>\n          <ion-avatar item-start>\n            <img src="{{vault.author_avatar}}">\n          </ion-avatar>\n          <h2>\n            <strong>{{vault.author}}</strong> |\n            <span class="gray">{{vault.length}}</span>\n          </h2>\n          <p>{{vault.posted}}</p>\n        </ion-item>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage">\n    <ion-infinite-scroll-content  loadingText="Loading more vaults..." ></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\vault\vault.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], VaultPage);
    return VaultPage;
}());

//# sourceMappingURL=vault.js.map

/***/ })

});
//# sourceMappingURL=0.js.map