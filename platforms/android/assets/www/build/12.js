webpackJsonp([12],{

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(482);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuPageModule = (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MenuPage = (function () {
    function MenuPage(alertCtrl, epxProvider, navCtrl, navParams) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rootPage = 'TabsPage';
        this.pages = [
            { title: 'Business', pageName: 'BusinessPage', tabComponent: 'BusinessPage', index: 0, icon: 'briefcase' },
            { title: 'Member Assist', pageName: 'AssistPage', tabComponent: 'AssistPage', index: 1, icon: 'hand' },
            { title: 'Mentor Match', pageName: 'MentorPage', tabComponent: 'MentorPage', index: 2, icon: 'phone-portrait' },
            { title: 'Notification', pageName: 'NotificationPage', tabComponent: 'NotificationPage', index: 3, icon: 'notifications' },
        ];
        this.epxProvider.getData('name').then(function (name) {
            _this.name = name;
        });
    }
    MenuPage.prototype.openPage = function (p) {
        this.navCtrl.push(p.pageName);
    };
    MenuPage.prototype.isActive = function (p) {
    };
    MenuPage.prototype.logoutUser = function () {
        this.epxProvider.clearUser();
        this.navCtrl.setRoot('LoginPage');
    };
    MenuPage.prototype.showPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Do you want to continue logout?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Okay',
                    handler: function (data) {
                        _this.logoutUser();
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"D:\epx_app\src\pages\menu\menu.html"*/'<ion-menu [content]="content" side="left">\n  <ion-header class="menu-header">\n    <!-- <ion-navbar>\n      <ion-title>menu</ion-title>\n    </ion-navbar> -->\n    <!-- <div class="user-info">\n      {{name}}\n    </div> -->\n  </ion-header>\n  <ion-content class="menu-content">\n    <div class="user-info">\n        <p>{{name}}</p>\n    </div>\n    <ion-list>\n      <ion-item menuClose *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon name="{{p.icon}}" item-start></ion-icon>\n        {{p.title}}\n      </ion-item>\n      <ion-item  (click)="showPrompt()">\n          <ion-icon name="md-exit" item-start></ion-icon>\n          Logout\n        </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav> -->\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"D:\epx_app\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=12.js.map