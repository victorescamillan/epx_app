webpackJsonp([19],{

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessDetailsPageModule", function() { return BusinessDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business_details__ = __webpack_require__(475);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BusinessDetailsPageModule = (function () {
    function BusinessDetailsPageModule() {
    }
    BusinessDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__business_details__["a" /* BusinessDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__business_details__["a" /* BusinessDetailsPage */]),
            ],
        })
    ], BusinessDetailsPageModule);
    return BusinessDetailsPageModule;
}());

//# sourceMappingURL=business-details.module.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
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
 * Generated class for the BusinessDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BusinessDetailsPage = (function () {
    function BusinessDetailsPage(epxProvider, navCtrl, navParams) {
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        var id = navParams.data.data.ID;
        this.loadBusinessDetails(id);
    }
    BusinessDetailsPage.prototype.loadBusinessDetails = function (id) {
        var _this = this;
        this.epxProvider.getBusinessDetails(id).subscribe(function (data) {
            _this.details = data;
            console.log('business details:', _this.details);
            _this.isLoading = false;
        });
    };
    BusinessDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessDetailsPage');
    };
    BusinessDetailsPage.prototype.memberDetails = function (member) {
        this.navCtrl.push('MemberDetailsPage', { data: member });
    };
    BusinessDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-business-details',template:/*ion-inline-start:"/Users/hpo-office/Documents/epx/epx_app/src/pages/business-details/business-details.html"*/'<!--\n  Generated template for the BusinessDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Business Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div id="indicator" [class]="isLoading ? \'show-indicator\' : \'hide-indicator\'">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <div class="page-thumbnail" *ngIf="!isLoading">\n    <img class="business-logo" [src]="details.page_thumbnail">\n    <div class="page-title">\n      <h2 class="md-text">{{details.business_name}}</h2>\n    </div>\n  </div>\n  <div class="business-content" *ngIf="!isLoading">\n\n    <img class="business-logo" [src]="details.business_logo">\n    <h4>Business Name:</h4>\n    <p class="md-text">{{details.business_name}}</p>\n\n    <h4>Business Description:</h4>\n    <p class="md-text pre-line" [innerHTML]="details.business_description"></p>\n\n    <h4>Target Customers:</h4>\n    <p class="md-text">{{details.target_customers}}</p>\n\n    <h4>Benefits Delivered:</h4>\n    <p class="md-text pre-line" [innerHTML]="details.benefits_delivered"></p>\n\n    <h4>Where I can use help:</h4>\n    <p class="md-text" >{{details.business_name}}</p>\n\n    <h4>Target Customers:</h4>\n    <p class="md-text">{{details.target_customers}}</p>\n\n    <div class="owner-info">\n      <img class="owner-thumbnail" [src]="details.avatar" (click)="memberDetails(details)">\n      <h1>{{details.member_name}}</h1>\n      <p class="md-text">{{details.member_position}}</p>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/hpo-office/Documents/epx/epx_app/src/pages/business-details/business-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], BusinessDetailsPage);
    return BusinessDetailsPage;
}());

//# sourceMappingURL=business-details.js.map

/***/ })

});
//# sourceMappingURL=19.js.map