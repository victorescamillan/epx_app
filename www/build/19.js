webpackJsonp([19],{

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(483);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = (function () {
    function LoginPage(formBuilder, modalController, epxProvider, loadingCtrl, navCtrl, navParams, alertCtrl) {
        this.formBuilder = formBuilder;
        this.modalController = modalController;
        this.epxProvider = epxProvider;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formGroup = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    // Validators.pattern(regexValidators.email),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        this.email_validation = this.formGroup.controls['email'];
        this.password_validation = this.formGroup.controls['password'];
    }
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
            _this.epxProvider.getLogin(_this.username, _this.password).subscribe(function (result) {
                if (result.authentication) {
                    // this.username = '';
                    // this.password = '';
                    console.log('user id', result.ID);
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
        });
    };
    LoginPage.prototype.forgotPassword = function () {
        this.forgotPasswordModal();
    };
    LoginPage.prototype.forgotPasswordModal = function () {
        this.modalController.create('ForgotPasswordPage').present();
    };
    LoginPage.prototype.forgotPasswordAlert = function () {
        var prompt = this.alertCtrl.create({
            title: 'Forgot Password',
            message: "Enter you email address to request password reset.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Enter your email address'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Request',
                    handler: function (data) {
                        console.log('Request clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\epx_app\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n -->\n<ion-content padding>\n  <div class="logo">\n    <img src="assets/imgs/epx_logo_colored.png" alt="epx logo">\n    <h1>Welcome Back!</h1>\n    <h1>New Adventures Await!</h1>\n  </div>\n  <form [formGroup]="formGroup">\n    <div class="login-item">\n      <ion-item>\n        <ion-label floating>Username</ion-label>\n        <ion-input [(ngModel)]="username" formControlName="email" type="email"></ion-input>\n      </ion-item>\n      <p class="danger small" *ngIf="email_validation.hasError(\'required\') && email_validation.touched">Username is required.</p>\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input [(ngModel)]="password" formControlName="password" type="password"></ion-input>\n      </ion-item>\n      <p class="danger small" *ngIf="password_validation.hasError(\'required\') && password_validation.touched">Password is required.</p>\n    </div>\n    <br/>\n    <button ion-button round block [disabled]="!formGroup.valid" (click)="loginUser()">Login</button>\n    \n    <button ion-button round block color="light" class="btn-forgot" (click)="forgotPassword()">Forgot your password?</button>\n  </form>\n\n\n  <!-- <p class="md-text center primary" (click)="forgotPassword()">Forgot your password?</p> -->\n\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=19.js.map