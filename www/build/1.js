webpackJsonp([1],{

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VaultDetailsPageModule", function() { return VaultDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vault_details__ = __webpack_require__(486);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VaultDetailsPageModule = (function () {
    function VaultDetailsPageModule() {
    }
    VaultDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vault_details__["a" /* VaultDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vault_details__["a" /* VaultDetailsPage */]),
            ],
        })
    ], VaultDetailsPageModule);
    return VaultDetailsPageModule;
}());

//# sourceMappingURL=vault-details.module.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VaultDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_epx_epx__ = __webpack_require__(137);
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





/**
 * Generated class for the VaultDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VaultDetailsPage = (function () {
    function VaultDetailsPage(loadingCtrl, epxProvider, cache, domSanitizer, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        var id = navParams.data.data.ID;
        this.LoadDetails(id);
    }
    VaultDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VaultDetailsPage');
    };
    VaultDetailsPage.prototype.LoadDetails = function (id) {
        var _this = this;
        this.epxProvider.getVaultDetails(id).subscribe(function (data) {
            _this.details = data;
            _this.isLoading = false;
            console.log('isLoading', _this.isLoading);
        });
    };
    VaultDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vault-details',template:/*ion-inline-start:"D:\epx_app\src\pages\vault-details\vault-details.html"*/'<!--\n  Generated template for the VaultDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Vault Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div id="indicator" [class]="isLoading ? \'show-indicator\' : \'hide-indicator\'">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <div class="content" *ngIf="!isLoading">\n    <iframe [src]="domSanitizer.bypassSecurityTrustResourceUrl(details.embed_link)" *ngIf="details.vault_type == \'video\'"> </iframe>\n    <img [src]="details.embed_link" *ngIf="details.vault_type == \'ebook\'">\n    <div class="title">\n      <h2>{{details.title}}</h2>\n      <p class="md-text" *ngIf="details.vault_type != \'ebook\'">Length {{details.length}}</p>\n    </div>\n    <div class="content-text">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-3>\n            <span class="md-text strong">Posted :</span>\n          </ion-col>\n          <ion-col col-9>\n            <span class="md-text">{{details.posted}}</span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-3>\n            <span class="md-text strong">Category :</span>\n          </ion-col>\n          <ion-col col-9>\n            <p class="md-text blue" *ngFor="let item of details.category">{{item}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-3>\n            <span class="md-text strong">Skills :</span>\n          </ion-col>\n          <ion-col col-9 class="tags">\n            <button ion-button round outline small *ngFor="let item of details.tags">{{item}}</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <div class="underline"></div>\n\n      <ion-item>\n        <ion-avatar>\n          <img src="{{details.author_avatar}}">\n        </ion-avatar>\n        <br />\n        <p class="md-text text-center">Member Since: {{details.member_since}}</p>\n      </ion-item>\n      <br />\n      <p class="text-center md-text">\n        <span class="strong ">{{details.author_name}}</span> is the\n        <span class="strong ">{{details.position}}</span> at\n        <span class="strong blue">{{details.company}}</span>, a\n        <span class="strong ">{{details.business_model}}</span> business in the\n        <span class="strong ">{{details.industry}}</span> industry with the\n        <span class="strong ">{{details.employee}}</span> employees.\n      </p>\n      <br />\n      <p class="md-text text-center">\n        <strong>A bit about me,</strong> {{details.personal_description}}</p>\n      <p class="md-text text-center">\n        <strong>A brief description about my business,</strong> {{details.business_description}}</p>\n      <br />\n      <p class="md-text text-center strong">I\'m an expert in:</p>\n      <p class="md-text text-center">{{details.expert_in}}</p>\n      <br />\n      <p class="md-text text-center strong">I can also help you with:</p>\n      <p class="md-text text-center">{{details.help_with}}</p>\n      <br />\n      <p class="md-text text-center strong">I prefer:</p>\n      <p class="md-text text-center pre-line" [innerHTML]="item" *ngFor="let item of details.I_prefer"></p>\n      <br />\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\vault-details\vault-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], VaultDetailsPage);
    return VaultDetailsPage;
}());

//# sourceMappingURL=vault-details.js.map

/***/ })

});
//# sourceMappingURL=1.js.map