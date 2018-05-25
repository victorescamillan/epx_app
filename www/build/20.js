webpackJsonp([20],{

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberDetailsPageModule", function() { return MemberDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__member_details__ = __webpack_require__(488);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MemberDetailsPageModule = (function () {
    function MemberDetailsPageModule() {
    }
    MemberDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__member_details__["a" /* MemberDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__member_details__["a" /* MemberDetailsPage */]),
            ],
        })
    ], MemberDetailsPageModule);
    return MemberDetailsPageModule;
}());

//# sourceMappingURL=member-details.module.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MemberDetailsPage; });
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



var MemberDetailsPage = (function () {
    function MemberDetailsPage(platform, renderer, epxProvider, navCtrl, navParams) {
        this.platform = platform;
        this.renderer = renderer;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.hasCrews = false;
        this.hasCurrent = false;
        this.hasPast = false;
        this.hasVideo = false;
        this.partial_details = navParams.data.data;
        console.log('parameters', this.partial_details);
    }
    MemberDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MemberDetailsPage');
        this.loadMemberDetails(this.partial_details.ID);
    };
    MemberDetailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var backAction = this.platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
            backAction();
        }, 2);
    };
    MemberDetailsPage.prototype.loadMemberDetails = function (id) {
        var _this = this;
        this.epxProvider.getMemberDetails(id).subscribe(function (data) {
            _this.details = data;
            var crews = _this.details.crews;
            if (crews != null) {
                _this.member_crews = Object.keys(crews).map(function (keys) { return crews[keys]; });
                if (_this.member_crews.length > 0) {
                    _this.hasCrews = true;
                }
                console.log('crews: ', _this.member_crews);
            }
            var current = _this.details.current_trips;
            if (current != null) {
                _this.current_trips = Object.keys(current).map(function (keys) { return current[keys]; });
                console.log('current trips: ', _this.current_trips);
                if (_this.current_trips.length > 0) {
                    _this.hasCurrent = true;
                }
            }
            var past = _this.details.past_trips;
            if (past != null) {
                _this.past_trips = Object.keys(past).map(function (keys) { return past[keys]; });
                console.log('past trips: ', _this.past_trips);
                if (_this.past_trips.length > 0) {
                    _this.hasPast = true;
                }
            }
            var video = _this.details.vault;
            if (video != null) {
                _this.vault_video = Object.keys(video).map(function (key) { return video[key]; });
                console.log('vault video: ', _this.vault_video);
                if (_this.vault_video.length > 0) {
                    _this.hasVideo = true;
                }
            }
            _this.isLoading = false;
            console.log('isLoading :', _this.isLoading);
        }, function (error) {
            _this.epxProvider.toastMessage('Internal Error!');
            _this.isLoading = false;
        });
    };
    //Navigate to Trip Details
    MemberDetailsPage.prototype.tripDetails = function (trip) {
        console.log('trip details:', trip);
        var data = {
            ID: trip.ID,
            isInterested: trip.trip_interested.interested,
            sashes_image: trip.sashes_image,
            location: trip.map_info.map_address,
            lat: Number(trip.map_info.map_latitude),
            lng: Number(trip.map_info.map_longitude),
            product_cat: trip.product_cat,
            title: trip.title,
            trip_gallery: trip.trip_gallery,
            full_content: trip.full_content
        };
        this.navCtrl.push('TripDetailsPage', { data: data });
    };
    //Navigate to Member Details
    MemberDetailsPage.prototype.memberDetails = function (member) {
        console.log('member details:', member);
        this.navCtrl.push('MemberDetailsPage', { data: member });
    };
    MemberDetailsPage.prototype.openBrowser = function (url) {
        console.log('company url:', url);
        window.open(url, "_system");
    };
    MemberDetailsPage.prototype.vaultDetails = function (vault) {
        this.navCtrl.push('VaultDetailsPage', { data: vault });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('spinner'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MemberDetailsPage.prototype, "spinner", void 0);
    MemberDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-member-details',template:/*ion-inline-start:"D:\epx_app\src\pages\member-details\member-details.html"*/'<!--\n  Generated template for the MemberDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Member Details</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class="basic-info">\n    <div class="member-info">\n      <img [src]="partial_details.avatar">\n      <h2>{{partial_details.name}}</h2>\n      <p class="no-margin">Member Since:</p>\n      <p class="no-margin">{{partial_details.member_since | date : \'MMMM d, y\'}}</p>\n    </div>\n    <div class="about">\n      <p class="sm-text">\n        <span class="strong">{{partial_details.name}}</span> is the\n        <span class="strong" [innerHtml]="partial_details.position"></span> at\n        <span class="strong blue" (click)="openBrowser(partial_details.business_url)" [innerHtml]="partial_details.company"></span>, a\n        <span class="strong ">{{partial_details.business_model}}</span> business in the\n        <span class="strong pre-line" [innerHtml]="partial_details.industry"></span> industry with the\n        <span class="strong">{{partial_details.employee}}</span> employees.</p>\n      <p class="sm-text">\n        <span class="strong break">A bit more about me, </span> <span class="pre-line" [innerHtml]="partial_details.personal_description"></span>\n      </p>\n      <p class="sm-text">\n        <span class="strong break">I\'m an expert in, </span> {{partial_details.expert_in}}\n      </p>\n      <p class="sm-text">\n        <span class="strong break">I can also help you with, </span> {{partial_details.help_with}}\n      </p>\n    </div>\n  </div>\n  <div id="indicator" #spinner [class]="isLoading ? \'show-indicator\' : \'hide-indicator\'">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <div *ngIf="!isLoading">\n    <div class="member-content">\n      <div class="business-info">\n        <div class="business-logo">\n          <img [src]="details.business.business_logo">\n        </div>\n        <p class="sm-text">\n          <span class="strong">A brief description about my business, </span> {{details.business.description}}\n        </p>\n        <p class="sm-text strong">I Prefer:</p>\n        <p class="sm-text pre-line" [innerHTML]="item" *ngFor="let item of details.I_prefer"></p>\n      </div>\n      <div class="affiliates">\n        <div class="crew" *ngIf="hasCrews">\n          <h4>{{details.name}}\'s Crew</h4>\n          <ion-scroll scrollX="true">\n            <ion-card *ngFor="let item of member_crews" (click)="memberDetails(item)">\n              <img class="interested" [src]="item.avatar" />\n              <ion-card-content>\n                <h3 class="text-center">\n                  <strong>{{item.name}}</strong>\n                </h3>\n                <div class="text-center sm-text">Member Since:</div>\n                <div class="text-center sm-text">{{item.member_since | date}}</div>\n              </ion-card-content>\n            </ion-card>\n          </ion-scroll>\n        </div>\n        <div class="vault">\n          <div class="vault-video" *ngIf="hasVideo">\n            <p class="md-text text-center strong">{{details.name}}\'s Vault Videos</p>\n            <ion-scroll scrollX="true">\n              <ion-card *ngFor="let vault of vault_video">\n                <img src="{{vault.thumbnail}}" (click)="vaultDetails(vault)">\n                <div class="vault-title">\n                  <h3>\n                    <strong [innerHtml]="vault.title | uppercase"></strong>\n                  </h3>\n                </div>\n                <ion-card-content>\n                  <ion-item class="author">\n                    <ion-avatar item-start>\n                      <img src="{{vault.author_avatar}}">\n                    </ion-avatar>\n                    <p class="sm-text strong">\n                      <strong>{{vault.author}}</strong> |\n                      <span class="gray">{{vault.length}}</span>\n                    </p>\n                    <p>{{vault.posted}}</p>\n                  </ion-item>\n                </ion-card-content>\n              </ion-card>\n            </ion-scroll>\n          </div>\n\n          <div class="current-trips" *ngIf="hasCurrent">\n            <p class="md-text text-center strong">Current Trips</p>\n            <ion-scroll scrollX="true">\n              <ion-card *ngFor="let trip of current_trips">\n                <img src="{{trip.thumbnail}}" (click)="tripDetails(trip)">\n                <ion-card-content>\n                  <p class="date-text">{{trip.start_date}} - {{trip.end_date}}</p>\n                  <h3>\n                    <strong>{{trip.title | uppercase}}</strong>\n                  </h3>\n                  <p>\n                    <strong class="price">{{trip.price}}</strong> Trip Fee</p>\n                </ion-card-content>\n              </ion-card>\n            </ion-scroll>\n          </div>\n          <div class="past-trips" *ngIf="hasPast">\n            <p class="md-text text-center strong">Past Trips</p>\n            <ion-scroll scrollX="true">\n              <ion-card *ngFor="let trip of past_trips">\n                <img src="{{trip.thumbnail}}" (click)="tripDetails(trip)">\n                <ion-card-content>\n                  <p class="date-text">{{trip.start_date}} - {{trip.end_date}}</p>\n                  <h3>\n                    <strong>{{trip.title | uppercase}}</strong>\n                  </h3>\n                  <p>\n                    <strong class="price">{{trip.price}}</strong> Trip Fee</p>\n                </ion-card-content>\n              </ion-card>\n            </ion-scroll>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\member-details\member-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], MemberDetailsPage);
    return MemberDetailsPage;
}());

//# sourceMappingURL=member-details.js.map

/***/ })

});
//# sourceMappingURL=20.js.map