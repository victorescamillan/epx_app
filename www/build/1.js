webpackJsonp([1],{

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VaultTagsPageModule", function() { return VaultTagsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vault_tags__ = __webpack_require__(493);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VaultTagsPageModule = (function () {
    function VaultTagsPageModule() {
    }
    VaultTagsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vault_tags__["a" /* VaultTagsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vault_tags__["a" /* VaultTagsPage */]),
            ],
        })
    ], VaultTagsPageModule);
    return VaultTagsPageModule;
}());

//# sourceMappingURL=vault-tags.module.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VaultTagsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
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
 * Generated class for the VaultTagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VaultTagsPage = (function () {
    function VaultTagsPage(epxProvider, navCtrl, navParams) {
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        console.log('data:', navParams.data);
        this.tag = navParams.data.data;
    }
    VaultTagsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VaultTagsPage');
        this.LoadVault();
    };
    VaultTagsPage.prototype.LoadVault = function () {
        var _this = this;
        this.epxProvider.getVaultTags(this.tag).subscribe(function (data) {
            _this.vaultList = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(Object.keys(data).map(function (key) { return data[key]; })); //Convert object to array since angular accepts array for iteration
            // console.log('vault list', vault);
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    VaultTagsPage.prototype.vaultDetails = function (vault) {
        this.navCtrl.push('VaultDetailsPage', { data: vault });
    };
    VaultTagsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vault-tags',template:/*ion-inline-start:"/Users/hpo-office/Documents/epx/epx_app/src/pages/vault-tags/vault-tags.html"*/'<!--\n  Generated template for the VaultTagsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{tag | uppercase}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}" >\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  \n  <ion-card *ngFor="let vault of vaultList | async">\n    <img [src]="vault.thumbnail" (click)="vaultDetails(vault)" class="{{vault.vault_type == \'video\' ? \'video\' : \'pdf\'}}" >\n    <ion-card-content>\n      <h3 class="content-text xl-text strong blue">\n        {{vault.title | uppercase}}\n      </h3>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="{{vault.author_avatar}}">\n        </ion-avatar>\n        <h2>\n          <strong>{{vault.author}}</strong> |\n          <span class="gray">{{vault.length}}</span>\n        </h2>\n        <p>{{vault.posted}}</p>\n      </ion-item>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/hpo-office/Documents/epx/epx_app/src/pages/vault-tags/vault-tags.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], VaultTagsPage);
    return VaultTagsPage;
}());

//# sourceMappingURL=vault-tags.js.map

/***/ })

});
//# sourceMappingURL=1.js.map