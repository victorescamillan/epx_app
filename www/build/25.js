webpackJsonp([25],{

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessDetailsPageModule", function() { return BusinessDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business_details__ = __webpack_require__(482);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__business_details__["a" /* BusinessDetailsPage */]),
            ],
        })
    ], BusinessDetailsPageModule);
    return BusinessDetailsPageModule;
}());

//# sourceMappingURL=business-details.module.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
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
    function BusinessDetailsPage(platform, epxProvider, navCtrl, navParams) {
        this.platform = platform;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        // let id = navParams.data.data.ID;
        // this.loadBusinessDetails(id); 
        this.partial_details = navParams.data.data;
        console.log('param', navParams.data.data);
    }
    BusinessDetailsPage.prototype.loadBusinessDetails = function (id) {
        var _this = this;
        this.epxProvider.getBusinessDetails(id).subscribe(function (data) {
            _this.details = data;
            console.log('details:', _this.details);
            _this.isLoading = false;
        }, function (error) {
            _this.epxProvider.toastMessage('Internal error!');
            _this.isLoading = false;
        });
    };
    BusinessDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessDetailsPage');
        this.loadBusinessDetails(this.partial_details.ID);
    };
    BusinessDetailsPage.prototype.memberDetails = function () {
        var data = {
            ID: this.details.ID,
            member_since: this.details.member_since,
            avatar: this.details.avatar,
            business_model: this.details.business_model,
            business_url: this.details.business_url,
            company: this.details.member_company,
            employee: this.details.employee,
            expert_in: this.details.expert_in,
            help_with: this.details.help_with,
            industry: this.details.industry,
            name: this.details.member_name,
            personal_description: this.details.personal_discription,
            position: this.details.member_position,
        };
        console.log('data', this.details);
        this.navCtrl.push('MemberDetailsPage', { data: data });
    };
    BusinessDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-business-details',template:/*ion-inline-start:"D:\epx_app\src\pages\business-details\business-details.html"*/'<!--\n  Generated template for the BusinessDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Business Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <!-- <div class="page-thumbnail" >\n    <img class="business-logo" [src]="details.page_thumbnail">\n    <div class="page-title">\n      <h2 class="md-text pre-line" [innerHtml]="details.business_name | uppercase"></h2>\n    </div>\n  </div> -->\n  <div class="business-content">\n    <img class="business-logo" [src]="partial_details.business_logo">\n    <h4>Business Name:</h4>\n    <p class="md-text no-margin">{{partial_details.business_name}}</p>\n\n    <h4>Business Description:</h4>\n    <p class="md-text pre-line no-margin" [innerHTML]="partial_details.business_description"></p>\n\n    <h4>Target Customers:</h4>\n    <p class="md-text ">{{partial_details.target_customers}}</p>\n\n    <h4>Benefits Delivered:</h4>\n    <p class="md-text pre-line no-margin" [innerHTML]="partial_details.benefits_delivered"></p>\n\n    <h4>Where I can use help:</h4>\n    <p class="md-text no-margin" [innerHTML]="partial_details.business_industry"></p>\n\n    <!-- <h4>Target Customers:</h4>\n    <p class="md-text">{{details.target_customers}}</p> -->\n    <div id="indicator" [class]="isLoading ? \'show-indicator\' : \'hide-indicator\'">\n      <ion-spinner name="crescent"></ion-spinner>\n    </div>\n    <div class="owner-info" *ngIf="!isLoading">\n      <img class="owner-thumbnail" [src]="partial_details.avatar" (click)="memberDetails()">\n      <h1>{{partial_details.member_name}}</h1>\n      <p class="md-text no-margin">{{partial_details.member_position}}</p>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\business-details\business-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], BusinessDetailsPage);
    return BusinessDetailsPage;
}());

//# sourceMappingURL=business-details.js.map

/***/ })

});
//# sourceMappingURL=25.js.map