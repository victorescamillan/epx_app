webpackJsonp([6],{

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssistPageModule", function() { return AssistPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assist__ = __webpack_require__(327);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AssistPageModule = (function () {
    function AssistPageModule() {
    }
    AssistPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__assist__["a" /* AssistPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__assist__["a" /* AssistPage */]),
            ],
        })
    ], AssistPageModule);
    return AssistPageModule;
}());

//# sourceMappingURL=assist.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(5);
var of_1 = __webpack_require__(211);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_cache__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AssistPage = (function () {
    function AssistPage(events, viewCtrl, renderer, cache, loadingCtrl, provider, navCtrl, navParams) {
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.cache = cache;
        this.loadingCtrl = loadingCtrl;
        this.provider = provider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.expertise = '';
        this.isLoading = true;
        this.isRefresh = false;
        this.isFilter = false;
        this.page = 1;
        this.totalPage = 0;
        this.oldScrollTop = 0;
        this.isNotification = false;
        console.log('navCtrl', navCtrl);
        this.events.subscribe(this.provider.CLOSE_PAGE, function (value) {
            if (value) {
                navCtrl.popToRoot();
            }
        });
    }
    AssistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AssistPage');
        this.loadMemberAssist();
    };
    AssistPage.prototype.closeFilter = function () {
        this.viewCtrl.dismiss();
    };
    AssistPage.prototype.loadMemberAssist = function (refresher) {
        var _this = this;
        var url = this.provider.business_infinite_url;
        var ttl = this.provider.TTL;
        var delay_type = this.provider.DELAY_TYPE;
        var groupKey = 'assist-list';
        this.page = 1;
        var connected = this.provider.isConnected();
        if (connected) {
            if (refresher) {
                this.expertise = '';
                this.provider.getData('ID').then(function (id) {
                    _this.provider.getMemberAssist(id, 10, _this.page).subscribe(function (res) {
                        var assist = __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(res.data);
                        _this.cache.loadFromDelayedObservable(url, assist, groupKey, ttl, delay_type).subscribe(function (data) {
                            _this.assistList = data;
                            _this.expertiseList = res.skill;
                            console.log(_this.assistList);
                        });
                        _this.isLoading = false;
                        _this.isFilter = false;
                        _this.page = 1;
                        refresher.complete();
                    }, function (error) {
                        _this.provider.toastMessage('Internal error!');
                        _this.isLoading = false;
                        refresher.complete();
                    });
                });
            }
            else {
                this.provider.getData('ID').then(function (id) {
                    _this.provider.getMemberAssist(id, 10, _this.page).subscribe(function (res) {
                        var assist = __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(res.data);
                        console.log('getMemberAssist', res.data);
                        _this.cache.loadFromDelayedObservable(url, assist, groupKey, ttl, delay_type).subscribe(function (data) {
                            console.log('loadFromObservable', data);
                            _this.assistList = data;
                        });
                        // this.assistList = res.data;
                        _this.totalPage = res.number_of_page;
                        _this.expertiseList = res.skill;
                        _this.isLoading = false;
                        _this.isRefresh = true;
                    }, function (error) {
                        _this.provider.toastMessage('Internal error!');
                        _this.isLoading = false;
                        _this.isRefresh = true;
                    });
                });
            }
        }
        else {
            this.provider.getData(url).then(function (data) {
                if (data != null) {
                    var offline_data = __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(data.value);
                    console.log('offline data: ', offline_data);
                    if (refresher) {
                        _this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(function (data) {
                            _this.assistList = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.assistList = data;
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
    //Pull to refresh page
    AssistPage.prototype.forceReload = function (refresher) {
        this.loadMemberAssist(refresher);
    };
    AssistPage.prototype.filterAssist = function () {
        var _this = this;
        if (this.expertise == '') {
            this.provider.toastMessage('Please select expertise.');
            return;
        }
        this.isFilter = true;
        // this.isLoading = true;
        // this.isRefresh = false;
        var loading = this.loadingCtrl.create({ content: 'Loading...' });
        loading.present().then(function () {
            _this.provider.getData('ID').then(function (id) {
                _this.provider.getMemberAssistFilter(id, _this.expertise).subscribe(function (res) {
                    console.log('getMemberAssistFilter', res);
                    if (res.result == true) {
                        _this.assistList = res.data;
                    }
                    else {
                        _this.provider.toastMessage('No results found!');
                    }
                    loading.dismiss();
                }, function (error) {
                    _this.provider.toastMessage('Internal Error!');
                    loading.dismiss();
                });
            });
        });
        setTimeout(function () {
            loading.dismiss();
        }, 20000);
    };
    AssistPage.prototype.respondToRequest = function (item) {
        var _this = this;
        if (item.connected) {
            this.navCtrl.push('ChatPage');
        }
        else {
            this.provider.getData('ID').then(function (id) {
                var loading = _this.loadingCtrl.create({
                    content: 'Please wait...',
                });
                loading.present().then(function () {
                    _this.provider.respondMemberAssist(id, item.ID).subscribe(function (res) {
                        console.log('respondToRequest', res);
                        if (res.result == true) {
                            _this.navCtrl.push('ChatPage');
                            item.connected = res.result;
                        }
                        loading.dismiss();
                    }, function (error) {
                        _this.provider.toastMessage('Internal error!');
                        loading.dismiss();
                    });
                });
            });
        }
    };
    AssistPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.provider.getData('ID').then(function (id) {
            _this.provider.getMemberAssist(id, _this.provider.PAGE_SIZE15, _this.page + 1).subscribe(function (res) {
                var assist = res.data;
                for (var i = 0; i < assist.length; i++) {
                    _this.assistList.push(assist[i]);
                    console.log(assist[i]);
                }
                infiniteScroll.complete();
                _this.page++;
                _this.isLoading = false;
                _this.isRefresh = true;
            }, function (error) {
                _this.provider.toastMessage('Internal error!');
                infiniteScroll.complete();
                _this.isLoading = false;
                _this.isRefresh = true;
            });
        });
    };
    AssistPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    AssistPage.prototype.onScroll = function (event) {
        console.log(this.fab);
        if (event.scrollTop - this.oldScrollTop > 10) {
            this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
            this.renderer.addClass(this.fab._mainButton._elementRef.nativeElement, 'fab-show');
            console.log('scroll down', event.scrollTop - this.oldScrollTop);
        }
        else if (event.scrollTop - this.oldScrollTop < 0) {
            this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
            this.renderer.removeClass(this.fab._mainButton._elementRef.nativeElement, 'fab-show');
            console.log('scroll up', event.scrollTop - this.oldScrollTop);
        }
        this.oldScrollTop = event.scrollTop;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], AssistPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('filter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AssistPage.prototype, "filter", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fab'),
        __metadata("design:type", Object)
    ], AssistPage.prototype, "fab", void 0);
    AssistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-assist',template:/*ion-inline-start:"D:\epx_app\src\pages\assist\assist.html"*/'<!--\n  Generated template for the AssistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Member Assist</ion-title>\n    <ion-buttons right *ngIf="isNotification">\n      <button ion-button icon-end (click)="closeFilter()">\n        Close\n        <ion-icon name="close-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content (ionScroll)="onScroll($event)">\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n  <div class="filter" #filter>\n    <ion-row>\n      <ion-col col-10>\n        <ion-item>\n          <ion-label>\n            Expertise\n          </ion-label>\n          <ion-select [(ngModel)]="expertise">\n            <ion-option *ngFor="let item of expertiseList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n\n      <ion-col col-2>\n        <button ion-button outline color="light" class="btn-search" (click)="filterAssist()">\n          Go\n        </button>\n      </ion-col>\n    </ion-row>\n  </div>\n  <ion-fab #fab bottom right class="fab-hide" (click)="scrollToTop()">\n    <button ion-fab mini>\n      <ion-icon name="arrow-dropup"></ion-icon>\n    </button>\n  </ion-fab>\n  <div id="indicator" class="{{isLoading ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <ion-card *ngFor="let item of assistList">\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{item.avatar}}">\n      </ion-avatar>\n      <h2>{{item.member_name}}</h2>\n      <ion-row class="sm-text">\n        <ion-col col-2>\n          <strong class="black">Skill :</strong>\n        </ion-col>\n        <ion-col col-10 class="gray">{{item.skill}}</ion-col>\n      </ion-row>\n    </ion-item>\n    <ion-card-content>\n      <p class="md-text pre-line" [innerHtml]="item.details">\n      </p>\n      <ion-row class="sm-text created">\n        <ion-col col-3>\n          <strong class="gray">Created :</strong>\n        </ion-col>\n        <ion-col col-9>{{item.date_created}}</ion-col>\n      </ion-row>\n      <ion-row class="sm-text">\n        <ion-col col-3>\n          <strong class="gray">Pending :</strong>\n        </ion-col>\n        <ion-col col-9>{{item.Pending}} days</ion-col>\n      </ion-row>\n      <button ion-button small outline [color]="item.connected ? \'secondary\' : \'primary\'" (click)="respondToRequest(item)">{{item.connected ? \'Connected\' : \'Respond\'}}</button>\n    </ion-card-content>\n  </ion-card>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage && !isFilter">\n    <ion-infinite-scroll-content loadingText="Loading more..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\assist\assist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], AssistPage);
    return AssistPage;
}());

//# sourceMappingURL=assist.js.map

/***/ })

});
//# sourceMappingURL=6.js.map