webpackJsonp([14],{

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification__ = __webpack_require__(488);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationPageModule = (function () {
    function NotificationPageModule() {
    }
    NotificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */]),
            ],
        })
    ], NotificationPageModule);
    return NotificationPageModule;
}());

//# sourceMappingURL=notification.module.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationPage = (function () {
    function NotificationPage(cache, epxProvider, navCtrl, navParams) {
        this.cache = cache;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.perPage = 0;
        this.totalData = 0;
        this.totalPage = 0;
    }
    NotificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationPage');
        this.LoadSolo();
    };
    NotificationPage.prototype.LoadSolo = function (refresher) {
        var _this = this;
        var url = this.epxProvider.member_infinite_url;
        var ttl = this.epxProvider.TTL;
        var delay_type = this.epxProvider.DELAY_TYPE;
        var groupKey = 'solo-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getMembersInfinite(this.page).subscribe(function (data) {
                console.log('data', data);
                _this.totalPage = data.number_of_page;
                // let solo = Observable.of(data.data);
                var solo = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.members);
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, solo, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.soloList = Object.keys(data).map(function (key) { return data[key]; });
                        console.log('result', _this.soloList);
                        refresher.complete();
                    });
                }
                else {
                    _this.cache.loadFromObservable(url, solo, groupKey).subscribe(function (data) {
                        _this.soloList = Object.keys(data).map(function (key) { return data[key]; });
                        console.log('result', _this.soloList);
                    });
                }
                _this.isLoading = false;
                _this.isRefresh = true;
                _this.epxProvider.updateNotification(_this.epxProvider.SOLO_BADGE);
            }, function (error) {
                console.log(error);
                _this.epxProvider.toastMessage('Internal Server Error!');
            });
        }
        else {
            this.epxProvider.getData(url).then(function (data) {
                if (data != null) {
                    var offline_data = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.value);
                    console.log('offline data: ', offline_data);
                    if (refresher) {
                        _this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.soloList = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.soloList = data;
                        });
                    }
                    _this.isLoading = false;
                    _this.isRefresh = true;
                }
                else {
                    console.log('offline data: ', data);
                    refresher.complete();
                }
            });
        }
    };
    NotificationPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getMembersInfinite(this.page + 1).subscribe(function (data) {
            var members = data.members;
            var temp = Object.keys(members).map(function (key) { return members[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.soloList.push(temp[i]);
            }
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
            _this.page++;
        }, function (error) {
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    NotificationPage.prototype.ionSelected = function () {
        console.log('solo selected');
        console.log('scroll top', this.content.scrollTop);
        if (this.content.scrollTop > 100) {
            this.content.scrollToTop();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], NotificationPage.prototype, "content", void 0);
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notification',template:/*ion-inline-start:"D:\epx_app\src\pages\notification\notification.html"*/'<!--\n  Generated template for the NotificationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Notification</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item-sliding *ngFor="let member of soloList">\n      <ion-item >\n        <ion-avatar item-start>\n          <img [src]="member.avatar" (click)="memberDetails(member)">\n        </ion-avatar>\n        <p class="item-text">\n            <span class="strong ">{{member.name}}</span> is the\n            <span class="strong " [innerHtml]="member.position"></span> at\n            <span class="strong blue" (click)="openBrowser(member.business_url)" [innerHtml]="member.company"></span>, a\n            <span class="strong " >{{member.business_model}}</span> business in the\n            <span class="strong pre-line" [innerHtml]="member.industry"></span> industry with the\n            <span class="strong ">{{member.employee}}</span> employees.\n          </p>\n      </ion-item>\n      <!-- <ion-item-options side="left">\n        <button ion-button color="secondary">\n          <ion-icon name="text"></ion-icon>\n          Message\n        </button>\n      </ion-item-options> -->\n      <ion-item-options side="right">\n        <button ion-button color="primary" (click)="memberDetails(member)">\n          <ion-icon name="person"></ion-icon>\n          Profile\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage">\n    <ion-infinite-scroll-content  loadingText="Loading more members..." ></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"D:\epx_app\src\pages\notification\notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ })

});
//# sourceMappingURL=14.js.map