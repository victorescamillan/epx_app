webpackJsonp([17],{

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(342);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
            ],
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(loadingCtrl, provider, events, navCtrl, navParams) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.provider = provider;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events.subscribe(this.provider.CLOSE_PAGE, function (value) {
            if (value) {
                navCtrl.popToRoot();
            }
        });
        //Disable toggle if no internet connection.
        if (!this.provider.isConnected()) {
            this.provider.toastMessage("Please check your connection.");
            this.disable = true;
        }
        else {
            this.disable = false;
        }
        this.provider.getData('enable_member').then(function (res) {
            console.log('enable_member', res);
            _this.member = res;
        });
        this.provider.getData('enable_vault').then(function (res) {
            console.log('enable_vault', res);
            _this.vault = res;
        });
        this.provider.getData('enable_get_lucky').then(function (res) {
            console.log('enable_get_lucky', res);
            _this.getLucky = res;
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.updateMember = function (member) {
        var _this = this;
        console.log('updateMember', member);
        if (this.provider.isConnected()) {
            var loading_1 = this.loadingCtrl.create({ content: 'Loading...' });
            loading_1.present().then(function () {
                _this.provider.enableMember(member).subscribe(function (res) {
                    if (res.result === 'true') {
                        _this.provider.saveData('enable_member', member);
                        _this.events.publish(_this.provider.MEMBER_NOTIFICATION, member);
                    }
                    else {
                        member = !member;
                    }
                    loading_1.dismiss();
                }, function (error) {
                    _this.provider.toastMessage('Internal Error!');
                    member = !member;
                    loading_1.dismiss();
                });
            });
        }
        else {
            this.provider.toastMessage("Can't proceed! Please check your connection.");
            this.disable = true;
        }
    };
    SettingsPage.prototype.updateVault = function (vault) {
        var _this = this;
        console.log('updateVault', vault);
        if (this.provider.isConnected()) {
            var loading_2 = this.loadingCtrl.create({ content: 'Loading...' });
            loading_2.present().then(function () {
                _this.provider.enableVault(vault).subscribe(function (res) {
                    if (res.result === 'true') {
                        _this.provider.saveData('enable_vault', vault);
                        _this.events.publish(_this.provider.VAULT_NOTIFICATION, vault);
                    }
                    else {
                        vault = !vault;
                    }
                    loading_2.dismiss();
                }, function (error) {
                    _this.provider.toastMessage('Internal Error!');
                    vault = !vault;
                    loading_2.dismiss();
                });
            });
        }
        else {
            this.provider.toastMessage("Can't proceed! Please check your connection.");
            this.disable = true;
        }
    };
    SettingsPage.prototype.updateGetLucky = function (getLucky) {
        var _this = this;
        console.log('updateGetLucky', getLucky);
        if (this.provider.isConnected()) {
            var loading_3 = this.loadingCtrl.create({ content: 'Loading...' });
            loading_3.present().then(function () {
                _this.provider.enableGetLucky(getLucky).subscribe(function (res) {
                    if (res.result === 'true') {
                        _this.provider.saveData('enable_get_lucky', getLucky);
                        _this.events.publish(_this.provider.VAULT_NOTIFICATION, getLucky);
                    }
                    else {
                        getLucky = !getLucky;
                    }
                    loading_3.dismiss();
                }, function (error) {
                    _this.provider.toastMessage('Internal Error!');
                    getLucky = !getLucky;
                    loading_3.dismiss();
                });
            });
        }
        else {
            this.provider.toastMessage("Can't proceed! Please check your connection.");
            this.disable = true;
        }
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\epx_app\src\pages\settings\settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p class="md-text strong">NOTIFICATION</p>\n  <ion-item>\n    <ion-label> New Member Added</ion-label>\n    <ion-toggle [(ngModel)]="member" [disabled]="disable" (ionChange)="updateMember(member)"></ion-toggle>\n  </ion-item>\n  <ion-item>\n    <ion-label> New Vault Asset</ion-label>\n    <ion-toggle [(ngModel)]="vault" [disabled]="disable" (ionChange)="updateVault(vault)"></ion-toggle>\n  </ion-item>\n  <ion-item>\n    <ion-label> Get Lucky</ion-label>\n    <ion-toggle [(ngModel)]="getLucky" [disabled]="disable" (ionChange)="updateGetLucky(getLucky)"></ion-toggle>\n  </ion-item>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=17.js.map