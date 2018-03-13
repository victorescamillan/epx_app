webpackJsonp([14],{

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MembersPageModule", function() { return MembersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__members__ = __webpack_require__(479);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MembersPageModule = (function () {
    function MembersPageModule() {
    }
    MembersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__members__["a" /* MembersPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__members__["a" /* MembersPage */]),
            ],
        })
    ], MembersPageModule);
    return MembersPageModule;
}());

//# sourceMappingURL=members.module.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MembersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
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
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MembersPage = (function () {
    function MembersPage(epxProvider, cache, navCtrl, navParams) {
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        // Set TTL to 12h
        cache.setDefaultTTL(60 * 60 * 12);
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
        this.LoadMembers();
    }
    MembersPage.prototype.LoadMembers = function (refresher) {
        var _this = this;
        var url = this.epxProvider.members_url;
        var ttl = 1000;
        var delay_type = 'all';
        var groupKey = 'member-list';
        this.epxProvider.getMembers().subscribe(function (data) {
            var members = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(Object.keys(data).map(function (key) { return data[key]; })); //Convert object to array since angular accepts array for iteration
            if (refresher) {
                _this.cache.loadFromDelayedObservable(url, members, groupKey, null, delay_type).subscribe(function (data) {
                    _this.memberList = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data);
                    refresher.complete();
                });
            }
            else {
                _this.cache.loadFromObservable(url, members, groupKey).subscribe(function (data) {
                    _this.memberList = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data);
                    _this.temp_memberList = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data);
                    // console.log('member list', data);
                });
            }
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    MembersPage.prototype.forceReload = function (refresher) {
        this.LoadMembers(refresher);
    };
    MembersPage.prototype.filterMembers = function (ev) {
        if (!this.isLoading) {
            this.memberList = this.temp_memberList;
            var val_1 = ev.target.value;
            if (val_1 && val_1.trim() !== '') {
                this.memberList = this.memberList.map(function (member) { return member.filter(function (item) {
                    return item.name.toLowerCase().includes(val_1.toLowerCase());
                }); });
            }
        }
    };
    MembersPage.prototype.memberDetails = function (member) {
        this.navCtrl.push('MemberDetailsPage', { data: member });
    };
    MembersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MembersPage');
    };
    MembersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-members',template:/*ion-inline-start:"D:\epx_app\src\pages\members\members.html"*/'<!--\n  Generated template for the MembersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>MEMBERS</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content refreshingText="Loading...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <br />\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  \n  <ion-searchbar  [(ngModel)]="terms" placeholder="Search Members" showCancelButton color="danger"  (ionInput)="filterMembers($event)" ></ion-searchbar>\n  <ion-list>\n    <ion-item-sliding *ngFor="let member of memberList  | async">\n      <ion-item >\n        <ion-avatar item-start>\n          <img [src]="member.avatar" (click)="memberDetails(member)">\n        </ion-avatar>\n        <p class="item-text">\n            <span class="strong ">{{member.name}}</span> is the\n            <span class="strong ">{{member.position}}</span> at\n            <span class="strong blue">{{member.company}}</span>, a\n            <span class="strong ">{{member.business_model}}</span> business in the\n            <span class="strong ">{{member.industry}}</span> industry with the\n            <span class="strong ">{{member.employee}}</span> employees.\n          </p>\n      </ion-item>\n      <ion-item-options side="left">\n        <button ion-button color="secondary">\n          <ion-icon name="text"></ion-icon>\n          Message\n        </button>\n        <!-- <button ion-button color="secondary">\n          <ion-icon name="call"></ion-icon>\n          Call\n        </button> -->\n      </ion-item-options>\n      <ion-item-options side="right">\n        <button ion-button color="primary" (click)="memberDetails(member)">\n          <ion-icon name="person"></ion-icon>\n          Profile\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\members\members.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], MembersPage);
    return MembersPage;
}());

//# sourceMappingURL=members.js.map

/***/ })

});
//# sourceMappingURL=14.js.map