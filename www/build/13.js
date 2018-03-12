webpackJsonp([13],{

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(474);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Push, PushObject, PushOptions } from '@ionic-native/push';
//phonegap-plugin-push
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    // username: string = '';
    // password: string = '';
    function LoginPage(
        // private push:Push,
        epxProvider, loadingCtrl, navCtrl, navParams, alertCtrl) {
        // this.push.hasPermission()
        //   .then((res: any) => {
        this.epxProvider = epxProvider;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        // username: string='jaylord.lagud.hpo@gmail.com';
        // password: string='jaylord.lagud.hpo@gmail.com';
        this.username = 'stan.lee@hpoutsourcinginc.com';
        this.password = 'VzOo$)dl';
        //     if (res.isEnabled) {
        //       console.log('We have permission to send push notifications');
        //       this.initPush();
        //     } else {
        //       console.log('We do not have permission to send push notifications');
        //     }
        //   });
    }
    // initPush(){
    //   const options: any = {
    //     android: {},
    //     ios: {
    //         alert: 'true',
    //         badge: true,
    //         sound: 'false'
    //     },
    //     windows: {},
    //     browser: {
    //         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    //     }
    //  };
    //   const pushObject: PushObject = this.push.init(options);
    //   pushObject.on('notification').subscribe((notification: any) => {
    //     console.log('Received a notification', notification)
    //     this.presentConfirm(notification.title,notification.message);
    //   });
    //   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    //   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    // }
    LoginPage.prototype.presentLoadingDefault = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Logging in...',
            dismissOnPageChange: true
        });
        loading.present().then(function () {
            _this.loginUser();
        });
    };
    LoginPage.prototype.presentConfirm = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Okay',
                    handler: function () {
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Logging in...',
            dismissOnPageChange: true
        });
        loading.present().then(function () {
            if (/^[a-zA-Z0-9@.]+$/.test(_this.username)) {
                _this.epxProvider.getLogin(_this.username, _this.password).subscribe(function (result) {
                    if (result.authentication) {
                        _this.username = '';
                        _this.password = '';
                        _this.epxProvider.saveData('ID', result.ID);
                        _this.epxProvider.saveData('name', result.name);
                        _this.epxProvider.saveData('authentication', result.authentication);
                        _this.navCtrl.setRoot('MenuPage');
                    }
                    else {
                        _this.showAlert('Login Failed', 'Invalid username or password');
                        loading.dismiss();
                    }
                });
            }
            else {
                _this.showAlert('Error', 'Invalid username');
                loading.dismiss();
            }
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\epx_app\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n -->\n <ion-content padding>\n  <div class="logo">\n    <img src="assets/imgs/epx_logo_colored.png" alt="epx logo">\n    <h1>Welcome Back!</h1>\n    <h1>New Adventure Await!</h1>\n  </div>\n  <div class="login-item">\n    <ion-item>\n    <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="username" type="text"></ion-input>\n    </ion-item>\n    <ion-item>\n    <ion-label floating>Password</ion-label>\n    <ion-input [(ngModel)]="password"  type="password"></ion-input>\n  </ion-item>\n</div>\n  <button ion-button round outline block (click)="loginUser()">Login</button>\n \n</ion-content>\n'/*ion-inline-end:"D:\epx_app\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=13.js.map