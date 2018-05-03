webpackJsonp([11],{

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoloPageModule", function() { return SoloPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solo__ = __webpack_require__(498);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SoloPageModule = (function () {
    function SoloPageModule() {
    }
    SoloPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__solo__["a" /* SoloPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__solo__["a" /* SoloPage */]),
            ],
        })
    ], SoloPageModule);
    return SoloPageModule;
}());

//# sourceMappingURL=solo.module.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SoloPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
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





var SoloPage = (function () {
    function SoloPage(renderer, events, loadingCtrl, epxProvider, cache, navCtrl, navParams) {
        this.renderer = renderer;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oldScrollTop = 0;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.perPage = 0;
        this.totalData = 0;
        this.totalPage = 0;
        this.fromDate = new Date().toISOString();
        this.toDate = new Date().toISOString();
        this.isFilter = false;
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    //Show badge if there is an update
    SoloPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.epxProvider.getData(this.epxProvider.SOLO_BADGE).then(function (badge) {
            if (badge != null && badge > 0) {
                _this.events.publish(_this.epxProvider.SOLO_BADGE, badge);
            }
        });
    };
    SoloPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SoloPage');
        this.LoadSolo();
    };
    SoloPage.prototype.soloDetails = function (solo) {
        this.navCtrl.push('SoloDetailsPage', { data: solo });
    };
    SoloPage.prototype.LoadSolo = function (refresher) {
        var _this = this;
        var url = this.epxProvider.solo_infinite_url;
        var ttl = this.epxProvider.TTL;
        var delay_type = this.epxProvider.DELAY_TYPE;
        var groupKey = 'solo-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getSoloInfinite(this.page).subscribe(function (data) {
                _this.totalPage = data.number_of_page;
                var solo = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.data);
                console.log('totalPage', _this.totalPage);
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, solo, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.soloList = Object.keys(data).map(function (key) { return data[key]; });
                        refresher.complete();
                        _this.isFilter = false;
                        _this.toDate = new Date().toISOString();
                        _this.fromDate = new Date().toISOString();
                    });
                }
                else {
                    _this.cache.loadFromObservable(url, solo, groupKey).subscribe(function (data) {
                        _this.soloList = Object.keys(data).map(function (key) { return data[key]; });
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
    //Pagination
    SoloPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getSoloInfinite(this.page + 1).subscribe(function (data) {
            var solo = data.data;
            var temp = Object.keys(solo).map(function (key) { return solo[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.soloList.push(temp[i]);
                console.log(data[i]);
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
    //Pull to refresh page
    SoloPage.prototype.forceReload = function (refresher) {
        this.LoadSolo(refresher);
    };
    //Tags
    SoloPage.prototype.soloByTags = function (tag) {
        console.log('tag', tag);
        this.navCtrl.push('SoloTagsPage', { data: tag });
    };
    SoloPage.prototype.ionSelected = function () {
        console.log('solo selected');
        var topDistance = this.content.getContentDimensions().scrollTop;
        console.log('scroll top', topDistance);
        if (topDistance > 10) {
            this.content.scrollToTop();
        }
    };
    SoloPage.prototype.updateSolo = function () {
        var _this = this;
        this.isLoading = true;
        this.isRefresh = false;
        this.isFilter = true;
        var from = new Date(this.fromDate.toString()).toLocaleDateString();
        var to = new Date(this.toDate.toString()).toLocaleDateString();
        console.log('update Solo', from, to);
        this.epxProvider.getSoloFilters(from, to).subscribe(function (res) {
            console.log('update Solo', res);
            if (res != null) {
                _this.soloList = Object.keys(res).map(function (key) { return res[key]; });
                _this.isLoading = false;
            }
            else {
                _this.epxProvider.toastMessage('No result found.');
                _this.isLoading = false;
            }
        }, function (error) {
            console.log('error: ', error);
        });
    };
    SoloPage.prototype.onScroll = function (event) {
        if (event.scrollTop <= 0) {
            this.renderer.removeClass(this.filter.nativeElement, 'overlay');
        }
        else if (event.scrollTop - this.oldScrollTop > 10) {
            this.renderer.addClass(this.filter.nativeElement, 'overlay');
            this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
        }
        else if (event.scrollTop - this.oldScrollTop < 0) {
            this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
        }
        this.oldScrollTop = event.scrollTop;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], SoloPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('filter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], SoloPage.prototype, "filter", void 0);
    SoloPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-solo',template:/*ion-inline-start:"D:\epx_app\src\pages\solo\solo.html"*/'<!--\n  Generated template for the SoloPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>SOLO</ion-title>\n    <!-- <h1 class="text-center">\n        <strong>SOLO</strong>\n      </h1> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content (ionScroll)="onScroll($event)">\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n  <div class="filter" #filter>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            From Date\n          </ion-label>\n          <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="fromDate"></ion-datetime>\n        </ion-item>\n      </ion-col>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            To Date\n          </ion-label>\n          <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="toDate"></ion-datetime>\n        </ion-item>\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button outline color="light" class="btn-search" (click)="updateSolo()">\n          <!-- <ion-icon name="search"></ion-icon> -->\n          Update\n        </button>\n      </ion-col>\n    </ion-row>\n  </div>\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <ion-card *ngFor="let solo of soloList">\n    <div class="solo-image">\n        <img src="{{solo.thumbnail}}" (click)="soloDetails(solo)">\n    </div>\n    <ion-card-content>\n      <h2 class="content-text">\n        <strong class="pre-line" [innerHtml]="solo.title | uppercase"></strong>\n      </h2>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            Price : \n          </ion-col>\n          <ion-col col-10>\n            <h3 class="text-price">\n              <strong >{{solo.price}}</strong>\n            </h3>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-2>\n            Date :\n          </ion-col>\n          <ion-col col-10>\n            <p class="sm-text">{{solo.start_date}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row *ngIf="solo.product_tag.length">\n          <ion-col col-2>\n            Tags :\n          </ion-col>\n          <ion-col col-10>\n            <button class="btn-tags" ion-button round outline small *ngFor="let tag of solo.product_tag" (click)="soloByTags(tag)">{{tag}}</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage && !isFilter">\n    <ion-infinite-scroll-content loadingText="Loading more solo..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\solo\solo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SoloPage);
    return SoloPage;
}());

//# sourceMappingURL=solo.js.map

/***/ })

});
//# sourceMappingURL=11.js.map