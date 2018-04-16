webpackJsonp([9],{

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabsPageModule = (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* TabsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* TabsPage */]),
            ]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());

//# sourceMappingURL=tabs.module.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_onesignal__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage(oneSignal, epxProvider, detectorRef, events, platform, alertCtrl, menuCtrl, navCtrl) {
        this.oneSignal = oneSignal;
        this.epxProvider = epxProvider;
        this.detectorRef = detectorRef;
        this.events = events;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.tripsRoot = 'TripsPage';
        this.vaultRoot = 'VaultPage';
        this.soloRoot = 'SoloPage';
        this.membersRoot = 'MembersPage';
        this.tripBadge = 0;
        this.soloBadge = 0;
        this.vaultBadge = 0;
        this.memberBadge = 0;
        if (platform.is('cordova')) {
            this.initOneSignal();
            this.initEvents();
            this.epxProvider.getNotification();
        }
    }
    TabsPage.prototype.initEvents = function () {
        var _this = this;
        //Hide badges when page is refreshed or updates was loaded.
        this.events.subscribe(this.epxProvider.TRIP_BADGE, function (badge) {
            console.log('receive trip badge', badge);
            _this.tripBadge = badge;
        });
        this.events.subscribe(this.epxProvider.SOLO_BADGE, function (badge) {
            console.log('receive solo badge', badge);
            _this.soloBadge = badge;
        });
        this.events.subscribe(this.epxProvider.VAULT_BADGE, function (badge) {
            console.log('receive solo badge', badge);
            _this.vaultBadge = badge;
        });
        this.events.subscribe(this.epxProvider.MEMBER_BADGE, function (badge) {
            console.log('receive solo badge', badge);
            _this.memberBadge = badge;
        });
        //Update notification tags.
        this.events.subscribe(this.epxProvider.MEMBER_NOTIFICATION, function (value) {
            _this.oneSignal.sendTag('member_added', value);
            _this.epxProvider.saveData(_this.epxProvider.MEMBER_NOTIFICATION, value);
        });
        this.events.subscribe(this.epxProvider.VAULT_NOTIFICATION, function (value) {
            _this.oneSignal.sendTag('vault_added', value);
            _this.epxProvider.saveData(_this.epxProvider.VAULT_NOTIFICATION, value);
        });
    };
    TabsPage.prototype.initOneSignal = function () {
        var _this = this;
        this.oneSignal.startInit('e70b4949-f7fa-4c3b-adfc-9e4d1ac64782', '1035774532822');
        this.oneSignal.getTags().then(function (data) {
            console.log('tags', data);
            if (data.user_id != null) {
                _this.epxProvider.saveData(_this.epxProvider.MEMBER_NOTIFICATION, data.member_added);
                _this.epxProvider.saveData(_this.epxProvider.VAULT_NOTIFICATION, data.vault_added);
            }
            else {
                _this.epxProvider.getData('ID').then(function (user_id) {
                    _this.oneSignal.sendTag('user_id', user_id);
                    _this.oneSignal.sendTag('member_added', 'true');
                    _this.oneSignal.sendTag('vault_added', 'true');
                });
            }
        });
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
            // do something when notification is received
            console.log('notificaiton received. ', data);
            var target = data.payload.additionalData.target;
            var update = data.payload.additionalData.update;
            console.log('target. ', target);
            switch (target) {
                case 'trip':
                    {
                        //Cache trip update count to make it accessible to other components.
                        _this.epxProvider.saveData(_this.epxProvider.TRIP_BADGE, update).then(function (badge) {
                            _this.tripBadge = badge;
                            _this.detectorRef.detectChanges();
                        });
                        break;
                    }
                case 'solo': {
                    _this.epxProvider.saveData(_this.epxProvider.SOLO_BADGE, update).then(function (badge) {
                        _this.soloBadge = badge;
                        _this.detectorRef.detectChanges();
                    });
                    break;
                }
                case 'vault': {
                    _this.epxProvider.saveData(_this.epxProvider.VAULT_BADGE, update).then(function (badge) {
                        _this.vaultBadge = badge;
                        _this.detectorRef.detectChanges();
                    });
                    break;
                }
                case 'member': {
                    _this.epxProvider.saveData(_this.epxProvider.MEMBER_BADGE, update).then(function (badge) {
                        _this.memberBadge = badge;
                        _this.detectorRef.detectChanges();
                    });
                    break;
                }
            }
        });
        this.oneSignal.handleNotificationOpened().subscribe(function (data) {
            // do something when a notification is opened
            console.log('notificaiton open. ', data);
            var target = data.notification.payload.additionalData.target;
            var update = data.notification.payload.additionalData.update;
            switch (target) {
                case 'trip':
                    {
                        //Cache trip update count to make it accessible to other components.
                        _this.epxProvider.saveData(_this.epxProvider.TRIP_BADGE, update).then(function (badge) {
                            _this.tripBadge = badge;
                            _this.detectorRef.detectChanges();
                        });
                        break;
                    }
                case 'solo': {
                    _this.epxProvider.saveData(_this.epxProvider.SOLO_BADGE, update).then(function (badge) {
                        _this.soloBadge = badge;
                        _this.detectorRef.detectChanges();
                    });
                    break;
                }
                case 'vault': {
                    _this.epxProvider.saveData(_this.epxProvider.VAULT_BADGE, update).then(function (badge) {
                        _this.vaultBadge = badge;
                        _this.detectorRef.detectChanges();
                    });
                    break;
                }
                case 'member': {
                    _this.epxProvider.saveData(_this.epxProvider.MEMBER_BADGE, update).then(function (badge) {
                        _this.memberBadge = badge;
                        _this.detectorRef.detectChanges();
                    });
                    break;
                }
            }
        });
        this.oneSignal.endInit();
    };
    TabsPage.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    TabsPage.prototype.openSideMenu = function () {
        this.menuCtrl.toggle();
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"D:\epx_app\src\pages\tabs\tabs.html"*/'<ion-tabs>\n    <ion-tab [root]="tripsRoot" tabTitle="Trips" tabIcon="plane"  tabBadge="{{tripBadge > 0 ? tripBadge : null}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab [root]="soloRoot" tabTitle="Solo" tabIcon="person" tabBadge="{{soloBadge > 0 ? soloBadge : null}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab [root]="vaultRoot" tabTitle="Vault" tabIcon="briefcase" tabBadge="{{vaultBadge > 0 ? vaultBadge : null}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab [root]="membersRoot" tabTitle="Members" tabIcon="people" tabBadge="{{memberBadge > 0 ? memberBadge : null}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab tabTitle="More" tabIcon="menu" (ionSelect)="openSideMenu()"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"D:\epx_app\src\pages\tabs\tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

});
//# sourceMappingURL=9.js.map