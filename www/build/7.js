webpackJsonp([7],{

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TripTagsPageModule", function() { return TripTagsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trip_tags__ = __webpack_require__(495);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TripTagsPageModule = (function () {
    function TripTagsPageModule() {
    }
    TripTagsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__trip_tags__["a" /* TripTagsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__trip_tags__["a" /* TripTagsPage */]),
            ],
        })
    ], TripTagsPageModule);
    return TripTagsPageModule;
}());

//# sourceMappingURL=trip-tags.module.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripTagsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
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




var TripTagsPage = (function () {
    function TripTagsPage(epxProvider, navCtrl, navParams) {
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        this.isInterested = false;
        this.tag = navParams.data.data;
        console.log('tag:', this.tag);
    }
    TripTagsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TripTagsPage');
        this.LoadTrips();
    };
    TripTagsPage.prototype.LoadTrips = function () {
        var _this = this;
        this.epxProvider.getData('ID').then(function (id) {
            console.log('user id:', id);
            _this.epxProvider.getTripTags(_this.tag, id).subscribe(function (data) {
                _this.tripList = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data);
                console.log('trips by tag:', _this.tripList);
                _this.isLoading = false;
                _this.isRefresh = true;
                _this.isInterested = false;
            });
        });
    };
    //Interested
    TripTagsPage.prototype.interested = function (trip) {
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
    TripTagsPage.prototype.tripDetails = function (trip) {
        // this.trip = trip;
        this.navCtrl.push('TripDetailsPage', { data: trip });
    };
    TripTagsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trip-tags',template:/*ion-inline-start:"D:\epx_app\src\pages\trip-tags\trip-tags.html"*/'<!--\n  Generated template for the TripTagsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{tag | uppercase}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <br />\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <ion-card *ngFor="let trip of tripList | async">\n    <div class="trip-image">\n      <button ion-button round outline small class="top">{{trip.product_cat[0]}}</button>\n      <img src="{{trip.thumbnail}}" (click)="tripDetails(trip)">\n      <img class="sashes" src="{{trip.sashes_image}}" *ngIf="trip.sashes_image != \'\'">\n      <div class="trip-meter" [style.background-image]="trip.gauge_meter_image" [style.background-position-x]="trip.gauge_meter_css">\n        <p class="sm-text strong white">{{trip.gauge_meter_percent}}</p>\n      </div>\n    </div>\n    <ion-card-content>\n      <p class="sm-text">{{trip.start_date}} - {{trip.end_date}}</p>\n      <h3 class="content-text">\n        <strong>{{trip.title | uppercase}}</strong>\n      </h3>\n      <p class="content-text">\n        <strong class="colored">{{trip.price}}</strong> Trip Fee</p>\n      <div class="btn-interested" *ngIf="trip.sashes_image == \'\'">\n        <button ion-button icon-right clear small (click)="interested(trip)">\n          <div>{{trip.trip_interested.interested ? "Interested" : "I\'m Interested"}}</div>\n          <ion-icon name="{{trip.trip_interested.interested ? \'heart\' : \'heart-outline\'}}"></ion-icon>\n        </button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"D:\epx_app\src\pages\trip-tags\trip-tags.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TripTagsPage);
    return TripTagsPage;
}());

//# sourceMappingURL=trip-tags.js.map

/***/ })

});
//# sourceMappingURL=7.js.map