webpackJsonp([10],{

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VaultCategoryPageModule", function() { return VaultCategoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vault_category__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VaultCategoryPageModule = (function () {
    function VaultCategoryPageModule() {
    }
    VaultCategoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vault_category__["a" /* VaultCategoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vault_category__["a" /* VaultCategoryPage */]),
            ],
        })
    ], VaultCategoryPageModule);
    return VaultCategoryPageModule;
}());

//# sourceMappingURL=vault-category.module.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VaultCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VaultCategoryPage = (function () {
    function VaultCategoryPage(platform, epxProvider, navCtrl, navParams) {
        this.platform = platform;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.totalPage = 0;
        console.log('data:', navParams.data);
        this.category = navParams.data.data;
    }
    VaultCategoryPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var backAction = this.platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
            backAction();
        }, 2);
    };
    VaultCategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VaultCategoryPage');
        this.LoadVault();
    };
    VaultCategoryPage.prototype.LoadVault = function () {
        var _this = this;
        this.epxProvider.getVaultCategory(this.category).subscribe(function (data) {
            _this.totalPage = data.number_of_page;
            _this.vaultList = data.vaults;
            console.log('vault list', _this.vaultList);
            _this.isLoading = false;
            _this.isRefresh = true;
        }, function (error) {
            console.log(error);
        });
    };
    VaultCategoryPage.prototype.vaultDetails = function (vault) {
        this.navCtrl.push('VaultDetailsPage', { data: vault });
    };
    VaultCategoryPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getVaultCategory(this.page + 1).subscribe(function (data) {
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
        }, function (error) {
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    VaultCategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vault-category',template:/*ion-inline-start:"D:\epx_app\src\pages\vault-category\vault-category.html"*/'<!--\n  Generated template for the VaultCategoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{category | uppercase}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <ion-card *ngFor="let vault of vaultList">\n    <div class="vault-image">\n      <img [src]="vault.thumbnail" (click)="vaultDetails(vault)" class="{{vault.vault_type == \'video\' ? \'video\' : \'pdf\'}}">\n    </div>\n    <ion-card-content>\n      <h3 class="content-text xl-text strong blue pre-line" [innerHtml]="vault.title | uppercase">\n      </h3>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="{{vault.author_avatar}}">\n        </ion-avatar>\n        <h2>\n          <strong>{{vault.author}}</strong> |\n          <span class="gray">{{vault.length}}</span>\n        </h2>\n        <p>{{vault.posted}}</p>\n      </ion-item>\n    </ion-card-content>\n  </ion-card>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage">\n    <ion-infinite-scroll-content loadingText="Loading more vaults..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\vault-category\vault-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], VaultCategoryPage);
    return VaultCategoryPage;
}());

//# sourceMappingURL=vault-category.js.map

/***/ })

});
//# sourceMappingURL=10.js.map