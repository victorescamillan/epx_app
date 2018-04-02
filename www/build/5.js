webpackJsonp([5],{

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TripFilterPageModule", function() { return TripFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trip_filter__ = __webpack_require__(486);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TripFilterPageModule = (function () {
    function TripFilterPageModule() {
    }
    TripFilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__trip_filter__["a" /* TripFilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__trip_filter__["a" /* TripFilterPage */]),
            ],
        })
    ], TripFilterPageModule);
    return TripFilterPageModule;
}());

//# sourceMappingURL=trip-filter.module.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
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
 * Generated class for the TripFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TripFilterPage = (function () {
    function TripFilterPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TripFilterPage.prototype.closeFilter = function () {
        this.viewCtrl.dismiss();
    };
    TripFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TripFilterPage');
    };
    TripFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trip-filter',template:/*ion-inline-start:"D:\epx_app\src\pages\trip-filter\trip-filter.html"*/'<!--\n  Generated template for the TripFilterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <!-- <ion-title>Search Trips</ion-title> -->\n    <ion-buttons right>\n        \n        <button ion-button  icon-end (click)="closeFilter()">\n            Close\n          <ion-icon name="close-circle"></ion-icon>\n          \n        </button>\n        \n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h1 class="text-center">Search Trips</h1>\n  <div class="select">\n      <ion-item>\n          <ion-label>Region</ion-label>\n          <ion-select [(ngModel)]="gaming">\n            <ion-option value="nes">Europe West</ion-option>\n            <ion-option value="n64">Central America</ion-option>\n            <ion-option value="ps">Africa</ion-option>\n            <ion-option value="genesis">USA</ion-option>\n            <ion-option value="saturn">East Asia</ion-option>\n            <ion-option value="snes">Carribean</ion-option>\n            <ion-option value="snes">South America</ion-option>\n          </ion-select>\n        </ion-item>\n  </div>\n  <div class="select">\n      <ion-item>\n          <ion-label>Trip Type</ion-label>\n          <ion-select [(ngModel)]="gaming">\n            <ion-option value="nes">Adventure</ion-option>\n            <ion-option value="n64">Beach</ion-option>\n            <ion-option value="ps">Food and Culture</ion-option>\n            <ion-option value="genesis">Nature</ion-option>\n            <ion-option value="saturn">Party</ion-option>\n            <ion-option value="snes">Sports</ion-option>\n            <ion-option value="snes">Thrill</ion-option>\n          </ion-select>\n        </ion-item>\n  </div>\n  <button ion-button round block outline>Update</button>\n</ion-content>\n'/*ion-inline-end:"D:\epx_app\src\pages\trip-filter\trip-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TripFilterPage);
    return TripFilterPage;
}());

//# sourceMappingURL=trip-filter.js.map

/***/ })

});
//# sourceMappingURL=5.js.map