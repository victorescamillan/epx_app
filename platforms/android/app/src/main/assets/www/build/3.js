webpackJsonp([3],{

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MembersPageModule", function() { return MembersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__members__ = __webpack_require__(338);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__members__["a" /* MembersPage */]),
            ],
        })
    ], MembersPageModule);
    return MembersPageModule;
}());

//# sourceMappingURL=members.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(5);
var of_1 = __webpack_require__(211);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MembersPage; });
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






/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MembersPage = (function () {
    function MembersPage(platform, alertCtrl, renderer, events, epxProvider, cache, navCtrl, navParams) {
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.renderer = renderer;
        this.events = events;
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
        this.isFilter = false;
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    MembersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MembersPage');
        this.LoadMembers();
        this.loadSkillsIndustry();
    };
    MembersPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var backAction = this.platform.registerBackButtonAction(function () {
            var x = _this.navCtrl.parent.select(0);
            console.log("second", x);
            backAction();
        }, 2);
    };
    MembersPage.prototype.LoadMembers = function (refresher) {
        var _this = this;
        var url = this.epxProvider.member_infinite_url;
        var ttl = this.epxProvider.TTL;
        var delay_type = this.epxProvider.DELAY_TYPE;
        var groupKey = 'member-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getMembersInfinite(this.page).subscribe(function (data) {
                var members = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.members);
                _this.totalPage = data.number_of_page;
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, members, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.members = Object.keys(data).map(function (key) { return data[key]; });
                        refresher.complete();
                        _this.loadSkillsIndustry();
                        _this.isFilter = false;
                    });
                }
                else {
                    _this.cache.loadFromDelayedObservable(url, members, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.members = Object.keys(data).map(function (key) { return data[key]; });
                        console.log('members:', members);
                    });
                }
                _this.isLoading = false;
                _this.isRefresh = true;
                _this.epxProvider.updateNotification(_this.epxProvider.MEMBER_BADGE);
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
                            _this.members = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.members = data;
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
    //Show badge if there is an update
    MembersPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.epxProvider.getData(this.epxProvider.MEMBER_BADGE).then(function (badge) {
            if (badge != null && badge > 0) {
                _this.events.publish(_this.epxProvider.MEMBER_BADGE, badge);
            }
        });
    };
    MembersPage.prototype.forceReload = function (refresher) {
        // this.LoadMembers(refresher);
        this.LoadMembers(refresher);
    };
    MembersPage.prototype.memberDetails = function (member) {
        this.navCtrl.push('MemberDetailsPage', { data: member });
    };
    MembersPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getMembersInfinite(this.page + 1).subscribe(function (data) {
            var members = data.members;
            var temp = Object.keys(members).map(function (key) { return members[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.members.push(temp[i]);
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
    MembersPage.prototype.openBrowser = function (url) {
        console.log('company url:', url);
        window.open(url, "_system");
    };
    MembersPage.prototype.ionSelected = function () {
        console.log('member selected', this.content.scrollTop);
        var topDistance = this.content.getContentDimensions().scrollTop;
        console.log('scroll top', topDistance);
        if (topDistance > 10) {
            this.content.scrollToTop();
        }
    };
    MembersPage.prototype.loadSkillsIndustry = function () {
        var _this = this;
        this.skills = '';
        this.industry = '';
        this.epxProvider.getMemberSkillsIndustry().subscribe(function (res) {
            console.log('getMemberSkillsIndustry', res);
            _this.skillsList = res.skills;
            _this.industryList = res.industry;
        }, function (error) {
            console.log('error: ', error);
        });
    };
    MembersPage.prototype.filterMembers = function () {
        var _this = this;
        if (this.skills === '' && this.industry === '' || this.skills == undefined && this.industry == undefined) {
            this.epxProvider.toastMessage('Please select skills or industry');
            return;
        }
        this.isFilter = true;
        this.isLoading = true;
        this.isRefresh = false;
        this.epxProvider.getMemberFilter(this.skills, this.industry).subscribe(function (res) {
            console.log('getMemberFilter', res);
            if (res.result === true) {
                var member = Object.keys(res.members).map(function (key) { return res.members[key]; });
                _this.members = member;
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
    MembersPage.prototype.onScroll = function (event) {
        if (event.scrollTop - this.oldScrollTop > 10) {
            this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
            console.log('scroll down', event.scrollTop - this.oldScrollTop);
        }
        else if (event.scrollTop - this.oldScrollTop < 0) {
            this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
            console.log('scroll up', event.scrollTop - this.oldScrollTop);
        }
        this.oldScrollTop = event.scrollTop;
    };
    MembersPage.prototype.searchMembers = function () {
        this.presentPrompt();
    };
    MembersPage.prototype.searchMembersByMap = function () {
        this.navCtrl.push('MemberMapPage');
    };
    MembersPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Member Search',
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
                        if (data.name === '') {
                            _this.epxProvider.toastMessage('Please input name');
                            _this.isLoading = false;
                            _this.isFilter = false;
                            return;
                        }
                        _this.epxProvider.getMemberSearch(data.name, _this.skills, _this.industry).subscribe(function (res) {
                            console.log('search result: ', res);
                            if (res.result === true) {
                                _this.members = Object.keys(res.members).map(function (key) { return res.members[key]; });
                            }
                            else {
                                _this.epxProvider.toastMessage('No results found.');
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
    ], MembersPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('filter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MembersPage.prototype, "filter", void 0);
    MembersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-members',template:/*ion-inline-start:"D:\epx_app\src\pages\members\members.html"*/'<!--\n  Generated template for the MembersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>MEMBERS</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only color="light" (click)="searchMembersByMap()">\n        <ion-icon  name="map"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button ion-button icon-only color="light" (click)="searchMembers()">\n        <ion-icon isActive="true" name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n \n</ion-header>\n\n\n<ion-content (ionScroll)="onScroll($event)">\n  <div class="filter" #filter>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Skills\n          </ion-label>\n          <ion-select [(ngModel)]="skills">\n            <!-- <ion-option disabled value="">Region</ion-option> -->\n            <ion-option *ngFor="let item of skillsList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Industry\n          </ion-label>\n          <ion-select [(ngModel)]="industry">\n            <!-- <ion-option disabled value="">Trip Type</ion-option> -->\n            <ion-option *ngFor="let item of industryList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button outline color="light" class="btn-search" (click)="filterMembers()">\n          <!-- <ion-icon name="search"></ion-icon> -->\n          Go\n        </button>\n      </ion-col>\n    </ion-row>\n  </div>\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <!-- <ion-searchbar  [(ngModel)]="terms" placeholder="Search Members" showCancelButton color="danger"  (ionInput)="filterMembers($event)" ></ion-searchbar> -->\n  <ion-list>\n    <ion-item-sliding *ngFor="let member of members">\n      <ion-item>\n        <ion-avatar item-start>\n          <img [src]="member.avatar" (click)="memberDetails(member)">\n        </ion-avatar>\n        <p class="item-text">\n          <span class="strong ">{{member.name}}</span> is the\n          <span class="strong " [innerHtml]="member.position"></span> at\n          <span class="strong blue" (click)="openBrowser(member.business_url)" [innerHtml]="member.company"></span>, a\n          <span class="strong ">{{member.business_model}}</span> business in the\n          <span class="strong pre-line" [innerHtml]="member.industry"></span> industry with the\n          <span class="strong ">{{member.employee}}</span> employees.\n        </p>\n      </ion-item>\n      <!-- <ion-item-options side="left">\n        <button ion-button color="secondary">\n          <ion-icon name="text"></ion-icon>\n          Message\n        </button>\n      </ion-item-options> -->\n      <ion-item-options side="right">\n        <button ion-button color="primary" (click)="memberDetails(member)">\n          <ion-icon name="person"></ion-icon>\n          Profile\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage && !isFilter">\n    <ion-infinite-scroll-content loadingText="Loading more members..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\members\members.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], MembersPage);
    return MembersPage;
}());

//# sourceMappingURL=members.js.map

/***/ })

});
//# sourceMappingURL=3.js.map