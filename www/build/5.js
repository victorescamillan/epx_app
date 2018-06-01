webpackJsonp([5],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessPageModule", function() { return BusinessPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business__ = __webpack_require__(330);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BusinessPageModule = (function () {
    function BusinessPageModule() {
    }
    BusinessPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__business__["a" /* BusinessPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__business__["a" /* BusinessPage */]),
            ],
        })
    ], BusinessPageModule);
    return BusinessPageModule;
}());

//# sourceMappingURL=business.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(5);
var of_1 = __webpack_require__(211);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(210);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BusinessPage = (function () {
    function BusinessPage(events, alertCtrl, renderer, epxProvider, cache, navCtrl, navParams) {
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.renderer = renderer;
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oldScrollTop = 0;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.totalPage = 0;
        this.isFilter = false;
        // Keep our cached results when device is offline!
        this.events.subscribe(this.epxProvider.CLOSE_PAGE, function (value) {
            if (value) {
                navCtrl.popToRoot();
            }
        });
        cache.setOfflineInvalidate(false);
    }
    BusinessPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessPage');
        this.LoadBusiness();
        this.loadSkillsCategory();
    };
    BusinessPage.prototype.LoadBusiness = function (refresher) {
        var _this = this;
        var url = this.epxProvider.business_infinite_url;
        var ttl = this.epxProvider.TTL;
        var delay_type = this.epxProvider.DELAY_TYPE;
        var groupKey = 'business-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        if (connected) {
            this.epxProvider.getBusinessInfinite(this.page).subscribe(function (data) {
                var business = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.data);
                _this.totalPage = data.number_of_page;
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, business, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.businessList = Object.keys(data).map(function (key) { return data[key]; });
                        console.log('business:', data);
                        refresher.complete();
                        _this.loadSkillsCategory();
                        _this.isFilter = false;
                    });
                }
                else {
                    _this.cache.loadFromDelayedObservable(url, business, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.businessList = Object.keys(data).map(function (key) { return data[key]; });
                        console.log('business:', data);
                    });
                }
                _this.isLoading = false;
                _this.isRefresh = true;
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
                        _this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(function (data) {
                            _this.businessList = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.businessList = data;
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
    BusinessPage.prototype.forceReload = function (refresher) {
        this.LoadBusiness(refresher);
    };
    BusinessPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getBusinessInfinite(this.page + 1).subscribe(function (data) {
            var business = data.data;
            var temp = Object.keys(business).map(function (key) { return business[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.businessList.push(temp[i]);
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
    BusinessPage.prototype.filterBusiness = function (ev) {
        if (!this.isLoading) {
            this.businessList = this.temp_businessList;
            var val_1 = ev.target.value;
            if (val_1 && val_1.trim() !== '') {
                this.businessList = this.businessList.map(function (business) { return business.filter(function (item) {
                    return item.business_name.toLowerCase().includes(val_1.toLowerCase());
                }); });
            }
        }
    };
    BusinessPage.prototype.businessDetails = function (business) {
        this.navCtrl.push('BusinessDetailsPage', { data: business });
    };
    BusinessPage.prototype.loadSkillsCategory = function () {
        var _this = this;
        this.skills = '';
        this.category = '';
        this.epxProvider.getBusinessSkillsCategory().subscribe(function (res) {
            console.log('initSkillsCategory', res);
            _this.skillsList = res.skills;
            _this.categoryList = res.category;
        });
    };
    BusinessPage.prototype.onScroll = function (event) {
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
    BusinessPage.prototype.searchBusiness = function () {
        this.presentPrompt();
    };
    BusinessPage.prototype.filterBusienss = function () {
        var _this = this;
        if (this.skills === '' && this.category === '' || this.skills == undefined && this.category == undefined) {
            this.epxProvider.toastMessage('Please select skills or category');
            return;
        }
        this.isFilter = true;
        this.isLoading = true;
        this.isRefresh = false;
        this.epxProvider.getBusinessFilter(this.skills, this.category).subscribe(function (res) {
            console.log('getBusinessFilter', res);
            if (res.result === true) {
                var business = Object.keys(res.data).map(function (key) { return res.data[key]; });
                _this.businessList = business;
            }
            else {
                _this.epxProvider.toastMessage('No results found!');
            }
            _this.isLoading = false;
        }, function (error) {
            console.log('error: ', error);
            _this.epxProvider.toastMessage('Internal error.');
            _this.isLoading = false;
        });
    };
    BusinessPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    BusinessPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Business Search',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Input name'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        _this.isLoading = true;
                        _this.isRefresh = false;
                        _this.isFilter = true;
                        _this.epxProvider.getBusinessSearch(data.name, _this.skills, _this.category).subscribe(function (res) {
                            console.log('search result: ', res);
                            if (res.result === true) {
                                _this.businessList = Object.keys(res.data).map(function (key) { return res.data[key]; });
                            }
                            else {
                                _this.epxProvider.toastMessage('No results found!');
                            }
                            _this.isLoading = false;
                        }, function (error) {
                            _this.epxProvider.toastMessage('Internal error.');
                            _this.isLoading = false;
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], BusinessPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('filter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], BusinessPage.prototype, "filter", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fab'),
        __metadata("design:type", Object)
    ], BusinessPage.prototype, "fab", void 0);
    BusinessPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-business',template:/*ion-inline-start:"D:\epx_app\src\pages\business\business.html"*/'<!--\n  Generated template for the BusinessPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>BUSINESS</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="light" (click)="searchBusiness()">\n        <ion-icon isActive="true" name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content (ionScroll)="onScroll($event)">\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n  <div class="filter" #filter>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Skill\n          </ion-label>\n          <ion-select [(ngModel)]="skills">\n            <!-- <ion-option disabled value="">Region</ion-option> -->\n            <ion-option *ngFor="let item of skillsList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Category\n          </ion-label>\n          <ion-select [(ngModel)]="category">\n            <!-- <ion-option disabled value="">Trip Type</ion-option> -->\n            <ion-option *ngFor="let item of categoryList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button outline color="light" class="btn-search" (click)="filterBusienss()">\n          <!-- <ion-icon name="search"></ion-icon> -->\n          Update\n        </button>\n      </ion-col>\n    </ion-row>\n  </div>\n  <ion-fab #fab bottom right class="fab-hide" (click)="scrollToTop()">\n    <button ion-fab mini>\n      <ion-icon name="arrow-dropup"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <!-- <ion-searchbar placeholder="Search Business" showCancelButton color="danger" (ionInput)="filterBusiness($event)"></ion-searchbar> -->\n\n  <ion-card *ngFor="let business of businessList" (click)="businessDetails(business)">\n    <div class="business-logo">\n      <img [src]="business.business_logo" />\n    </div>\n    <div class="content-text">\n      <div class="card-title pre-line" [innerHtml]="business.business_name | uppercase"></div>\n      <h2 class="gray pre-line">{{business.member_name}}</h2>\n      <div class="card-subtitle pre-line" [innerHTML]="business.business_industry"></div>\n    </div>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage && !isFilter">\n    <ion-infinite-scroll-content loadingText="Loading more business..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\business\business.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], BusinessPage);
    return BusinessPage;
}());

//# sourceMappingURL=business.js.map

/***/ })

});
//# sourceMappingURL=5.js.map