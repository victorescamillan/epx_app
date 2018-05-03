webpackJsonp([10],{

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(499);
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

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
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
        this.mentorBadge = 0;
        this.assistBadge = 0;
        this.isAppOpen = false;
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
        this.oneSignal.startInit('13cedc03-fa5f-4f96-ba81-3ed7f3698052', '188374332009');
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
                    _this.oneSignal.sendTag('development', 'true');
                });
            }
        });
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
            // do something when notification is received
            console.log('notificaiton received. ', data);
            var target = data.payload.additionalData.target;
            var update = data.payload.additionalData.update;
            console.log('target. ', target);
            console.log('update. ', update);
            _this.isAppOpen = true;
            switch (target) {
                case 'trip': {
                    //Cache trip update count to make it accessible to other components.
                    _this.epxProvider.getData(_this.epxProvider.TRIP_BADGE).then(function (old_badge) {
                        if (old_badge != null && old_badge > 0) {
                            var badge = Number(update) + Number(old_badge);
                            _this.epxProvider.saveData(_this.epxProvider.TRIP_BADGE, badge).then(function (new_badge) {
                                _this.tripBadge = new_badge;
                                _this.detectorRef.detectChanges();
                            });
                        }
                        else {
                            _this.epxProvider.saveData(_this.epxProvider.TRIP_BADGE, update).then(function (new_badge) {
                                _this.tripBadge = new_badge;
                                _this.detectorRef.detectChanges();
                            });
                        }
                    });
                    break;
                }
                // case 'solo': {
                //   this.epxProvider.getData(this.epxProvider.SOLO_BADGE).then(old_badge => {
                //     if (old_badge != null && old_badge > 0) {
                //       let badge = Number(update) + Number(old_badge);
                //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, badge).then(new_badge => {
                //         this.soloBadge = new_badge;
                //         this.detectorRef.detectChanges();
                //       });
                //     }
                //     else {
                //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, update).then(new_badge => {
                //         this.soloBadge = new_badge;
                //         this.detectorRef.detectChanges();
                //       });
                //     }
                //   });
                //   break;
                // }
                case 'vault': {
                    _this.epxProvider.getData(_this.epxProvider.VAULT_BADGE).then(function (old_badge) {
                        if (old_badge != null && old_badge > 0) {
                            var badge = Number(update) + Number(old_badge);
                            _this.epxProvider.saveData(_this.epxProvider.VAULT_BADGE, badge).then(function (new_badge) {
                                _this.vaultBadge = new_badge;
                                _this.detectorRef.detectChanges();
                            });
                        }
                        else {
                            _this.epxProvider.saveData(_this.epxProvider.VAULT_BADGE, update).then(function (new_badge) {
                                _this.vaultBadge = new_badge;
                                _this.detectorRef.detectChanges();
                            });
                        }
                    });
                    break;
                }
                case 'member': {
                    _this.epxProvider.getData(_this.epxProvider.MEMBER_BADGE).then(function (old_badge) {
                        if (old_badge != null && old_badge > 0) {
                            var badge = Number(update) + Number(old_badge);
                            _this.epxProvider.saveData(_this.epxProvider.MEMBER_BADGE, badge).then(function (new_badge) {
                                _this.memberBadge = new_badge;
                                _this.detectorRef.detectChanges();
                            });
                        }
                        else {
                            _this.epxProvider.saveData(_this.epxProvider.MEMBER_BADGE, update).then(function (new_badge) {
                                _this.memberBadge = new_badge;
                                _this.detectorRef.detectChanges();
                            });
                        }
                    });
                    break;
                }
            }
        });
        this.oneSignal.handleNotificationOpened().subscribe(function (data) {
            // do something when a notification is opened
            console.log('notification open. ', data);
            var target = data.notification.payload.additionalData.target;
            var update = data.notification.payload.additionalData.update;
            var isFocus = data.notification.isAppInFocus;
            var trip = data.notification.payload.additionalData;
            console.log('isAppInFocus. ', isFocus);
            if (_this.isAppOpen) {
                switch (target) {
                    case 'mentor-match': {
                        _this.navCtrl.push('MentorPage');
                        break;
                    }
                    case 'member-assist': {
                        _this.navCtrl.push('AssistPage');
                        break;
                    }
                    case 'trip-detail': {
                        var data_1 = {
                            ID: trip.ID,
                            isInterested: trip.isInterested,
                            sashes_image: trip.sashes_image,
                            location: trip.location,
                            lat: Number(trip.lat),
                            lng: Number(trip.lng)
                        };
                        _this.navCtrl.push('TripDetailsPage', { data: data_1 });
                    }
                    case 'get-lucky': {
                        _this.navCtrl.push('ChatPage');
                    }
                }
            }
            else {
                switch (target) {
                    case 'trip': {
                        //Cache trip update count to make it accessible to other components.
                        _this.epxProvider.getData(_this.epxProvider.TRIP_BADGE).then(function (old_badge) {
                            if (old_badge != null && old_badge > 0) {
                                var badge = Number(update) + Number(old_badge);
                                _this.epxProvider.saveData(_this.epxProvider.TRIP_BADGE, badge).then(function (new_badge) {
                                    _this.tripBadge = new_badge;
                                    _this.detectorRef.detectChanges();
                                });
                            }
                            else {
                                _this.epxProvider.saveData(_this.epxProvider.TRIP_BADGE, update).then(function (new_badge) {
                                    _this.tripBadge = new_badge;
                                    _this.detectorRef.detectChanges();
                                });
                            }
                        });
                        break;
                    }
                    case 'trip-detail': {
                        var data_2 = {
                            ID: trip.ID,
                            isInterested: trip.isInterested,
                            sashes_image: trip.sashes_image,
                            location: trip.location,
                            lat: Number(trip.lat),
                            lng: Number(trip.lng)
                        };
                        _this.navCtrl.push('TripDetailsPage', { data: data_2 });
                    }
                    // case 'solo': {
                    //   this.epxProvider.getData(this.epxProvider.SOLO_BADGE).then(old_badge => {
                    //     if (old_badge != null && old_badge > 0) {
                    //       let badge = Number(update) + Number(old_badge);
                    //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, badge).then(new_badge => {
                    //         this.soloBadge = new_badge;
                    //         this.detectorRef.detectChanges();
                    //       });
                    //     }
                    //     else {
                    //       this.epxProvider.saveData(this.epxProvider.SOLO_BADGE, update).then(new_badge => {
                    //         this.soloBadge = new_badge;
                    //         this.detectorRef.detectChanges();
                    //       });
                    //     }
                    //   });
                    //   break;
                    // }
                    case 'vault': {
                        _this.epxProvider.getData(_this.epxProvider.VAULT_BADGE).then(function (old_badge) {
                            if (old_badge != null && old_badge > 0) {
                                var badge = Number(update) + Number(old_badge);
                                _this.epxProvider.saveData(_this.epxProvider.VAULT_BADGE, badge).then(function (new_badge) {
                                    _this.vaultBadge = new_badge;
                                    _this.detectorRef.detectChanges();
                                });
                            }
                            else {
                                _this.epxProvider.saveData(_this.epxProvider.VAULT_BADGE, update).then(function (new_badge) {
                                    _this.vaultBadge = new_badge;
                                    _this.detectorRef.detectChanges();
                                });
                            }
                        });
                        break;
                    }
                    case 'member': {
                        _this.epxProvider.getData(_this.epxProvider.MEMBER_BADGE).then(function (old_badge) {
                            if (old_badge != null && old_badge > 0) {
                                var badge = Number(update) + Number(old_badge);
                                _this.epxProvider.saveData(_this.epxProvider.MEMBER_BADGE, badge).then(function (new_badge) {
                                    _this.memberBadge = new_badge;
                                    _this.detectorRef.detectChanges();
                                });
                            }
                            else {
                                _this.epxProvider.saveData(_this.epxProvider.MEMBER_BADGE, update).then(function (new_badge) {
                                    _this.memberBadge = new_badge;
                                    _this.detectorRef.detectChanges();
                                });
                            }
                        });
                        break;
                    }
                    case 'mentor-match': {
                        _this.navCtrl.push('MentorPage');
                        break;
                    }
                    case 'member-assist': {
                        _this.navCtrl.push('AssistPage');
                        break;
                    }
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
            selector: 'page-tabs',template:/*ion-inline-start:"D:\epx_app\src\pages\tabs\tabs.html"*/'<ion-tabs>\n    <!-- <ion-tab [root]="assistRoot" tabTitle="Assist" tabIcon="phone-portrait" ></ion-tab> \n    <ion-tab [root]="mentorRoot" tabTitle="Mentor" tabIcon="phone-portrait" ></ion-tab>  -->\n    <ion-tab [root]="tripsRoot" tabTitle="Trips" tabIcon="plane"  tabBadge="{{tripBadge > 0 ? tripBadge : null}}"  tabBadgeStyle="danger"></ion-tab>\n    <ion-tab [root]="soloRoot" tabTitle="Solo" tabIcon="person" tabBadge="{{soloBadge > 0 ? soloBadge : null}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab [root]="vaultRoot" tabTitle="Vault" tabIcon="briefcase" tabBadge="{{vaultBadge > 0 ? vaultBadge : null}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab [root]="membersRoot" tabTitle="Members" tabIcon="people" tabBadge="{{memberBadge > 0 ? memberBadge : null}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab tabTitle="More" tabIcon="menu"  (ionSelect)="openSideMenu()"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"D:\epx_app\src\pages\tabs\tabs.html"*/,
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
//# sourceMappingURL=10.js.map