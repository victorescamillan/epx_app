webpackJsonp([10],{

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoloDetailsPageModule", function() { return SoloDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solo_details__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SoloDetailsPageModule = (function () {
    function SoloDetailsPageModule() {
    }
    SoloDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__solo_details__["a" /* SoloDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__solo_details__["a" /* SoloDetailsPage */]),
            ],
        })
    ], SoloDetailsPageModule);
    return SoloDetailsPageModule;
}());

//# sourceMappingURL=solo-details.module.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SoloDetailsPage; });
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


var SoloDetailsPage = (function () {
    function SoloDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.details = navParams.data.data;
        this.lat = Number(this.details.latitude);
        this.lng = Number(this.details.longitude);
        this.location = this.details.address;
        console.log('solo details', this.details);
    }
    SoloDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SoloDetailsPage');
        this.initMap(this.lat, this.lng, this.location);
    };
    SoloDetailsPage.prototype.initMap = function (lat, long, location) {
        var position = { lat: lat, lng: long };
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 15,
            center: position,
            mapTypeId: 'roadmap'
        });
        var marker = new google.maps.Marker({
            position: position,
            map: this.map,
            title: location
        });
        this.map.setCenter(position);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], SoloDetailsPage.prototype, "mapElement", void 0);
    SoloDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-solo-details',template:/*ion-inline-start:"D:\epx_app\src\pages\solo-details\solo-details.html"*/'<!--\n  Generated template for the SoloDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Solo Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <img src="{{details.thumbnail}}" />\n  <div id="title">\n    <p>{{details.title}}</p>\n  </div>\n  <div class="content-text">\n    <p class="pre-line sm-text" [innerHTML]="details.content"></p>\n\n    <div class="other-details">\n      <p class="text-center xxl-text">Trip Fee</p>\n      <div class="price">\n        <p class="text-center xxl-text">{{details.price}}</p>\n      </div>\n      <p class="text-center xxl-text strong">Date</p>\n      <p class="text-center xxl-text">{{details.start_date}}</p>\n\n      <p class="text-center xxl-text strong">Location</p>\n      <p class="text-center xxl-text">{{details.address}}</p>\n    </div>\n  </div>\n  <div #map id="map"></div>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\solo-details\solo-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], SoloDetailsPage);
    return SoloDetailsPage;
}());

//# sourceMappingURL=solo-details.js.map

/***/ })

});
//# sourceMappingURL=10.js.map