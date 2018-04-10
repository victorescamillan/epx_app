webpackJsonp([10],{

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(490);
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

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_push__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_epx_epx__ = __webpack_require__(136);
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
    function TabsPage(epxProvider, detectorRef, events, push, platform, alertCtrl, menuCtrl, navCtrl) {
        var _this = this;
        this.epxProvider = epxProvider;
        this.detectorRef = detectorRef;
        this.events = events;
        this.push = push;
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
            this.push.hasPermission()
                .then(function (res) {
                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                    _this.initPush();
                }
                else {
                    console.log('We do not have permission to send push notifications');
                }
            });
        }
        this.initEvents();
    }
    //Hide badges when page is refreshed or updates was loaded.
    TabsPage.prototype.initEvents = function () {
        var _this = this;
        this.events.subscribe(this.epxProvider.TRIP_BADGE, function (badge) {
            console.log('badge value', badge);
            _this.tripBadge = badge;
        });
        this.events.subscribe(this.epxProvider.SOLO_BADGE, function (badge) {
            console.log('badge value', badge);
            _this.soloBadge = badge;
        });
    };
    TabsPage.prototype.initPush = function () {
        var _this = this;
        var options = {
            android: {
                senderID: '1035774532822',
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false',
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            // console.log('Received a notification', notification);
            var additionalData = notification.additionalData;
            switch (additionalData.target) {
                case 'trip':
                    {
                        //Cache trip update count to make it accessible to other components.
                        _this.epxProvider.saveData(_this.epxProvider.TRIP_BADGE, additionalData.update).then(function (badge) {
                            // console.log('result',badge);
                            _this.tripBadge = badge;
                            _this.detectorRef.detectChanges();
                        });
                        break;
                    }
                case 'solo': {
                    _this.epxProvider.saveData(_this.epxProvider.SOLO_BADGE, additionalData.update).then(function (badge) {
                        // console.log('result',badge);
                        _this.soloBadge = badge;
                        _this.detectorRef.detectChanges();
                    });
                    break;
                }
                default: {
                    _this.navCtrl.push('NotificationPage');
                }
            }
        });
        pushObject.on('registration').subscribe(function (registration) { return console.log('Device registered', registration); });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_push__["a" /* Push */],
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
//# sourceMappingURL=10.js.map