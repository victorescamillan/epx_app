webpackJsonp([20],{

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorPageModule", function() { return MentorPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mentor__ = __webpack_require__(339);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MentorPageModule = (function () {
    function MentorPageModule() {
    }
    MentorPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mentor__["a" /* MentorPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mentor__["a" /* MentorPage */]),
            ],
        })
    ], MentorPageModule);
    return MentorPageModule;
}());

//# sourceMappingURL=mentor.module.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MentorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_epx_epx__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MentorPage = (function () {
    function MentorPage(events, loadingCtrl, provider, alertCtrl, formBuilder, navCtrl, navParams) {
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.provider = provider;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.skillQty = 1;
        this.maxChar = 500;
        this.consumeChar = 0;
        this.isLoading = true;
        this.events.subscribe(this.provider.CLOSE_PAGE, function (value) {
            if (value) {
                navCtrl.popToRoot();
            }
        });
        this.formGroup = formBuilder.group({
            details: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.details_control = this.formGroup.controls['details'];
    }
    MentorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MentorPage', this.skill);
        this.initSkillSet();
    };
    MentorPage.prototype.resizeInput = function () {
        if (this.myInput.nativeElement.scrollHeight > 120) {
            this.myInput.nativeElement.style.height = (this.myInput.nativeElement.scrollHeight) + 'px';
        }
        console.log(this.myInput.nativeElement.scrollHeight);
        this.consumeChar = this.myInput.nativeElement.value.length;
    };
    MentorPage.prototype.initSkillSet = function () {
        var _this = this;
        this.provider.getMentorMatchSkills().subscribe(function (res) {
            _this.skillList = res.skills;
            console.log('skill set: ', _this.skillList);
            _this.isLoading = false;
        });
    };
    MentorPage.prototype.selectedSkill = function (item) {
        this.skill = item;
        console.log('selected skill', item);
    };
    MentorPage.prototype.submitSkill = function () {
        var _this = this;
        if (this.skill != undefined || this.skill != '') {
            var loading_1 = this.loadingCtrl.create({ content: 'Submitting...' });
            loading_1.present().then(function () {
                _this.provider.getData('ID').then(function (id) {
                    _this.provider.submitMentorMatchSkill(_this.skill, _this.details, id).subscribe(function (res) {
                        console.log('result', res);
                        if (res.Message === 'Success') {
                            _this.details = '';
                            _this.presentAlert();
                        }
                        loading_1.dismiss();
                    }, function (error) {
                        _this.provider.toastMessage('Internal Error!');
                        loading_1.dismiss();
                    });
                });
            });
            setTimeout(function () {
                loading_1.dismiss();
            }, 20000);
        }
        else {
            this.provider.toastMessage('Please select skill');
        }
    };
    MentorPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'THANK YOU!',
            subTitle: 'Your request is in the route! Be on the lookout for others needing your help and engage as much as you can! Give. Give. Give. With Love and Affection, Your Match-Making Pals @ EPX',
            buttons: ['Ok']
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myInput'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MentorPage.prototype, "myInput", void 0);
    MentorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mentor',template:/*ion-inline-start:"D:\epx_app\src\pages\mentor\mentor.html"*/'<!--\n  Generated template for the MentorPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Mentor Match</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <p class="sm-text">Every business needs help and as a member of EPX you have access to some of the most brilliant minds in business commited\n    to helping you accelerate success. Simply choose one skill you need help with and provide some detail below.</p>\n  <p class="sm-text">You will be notified by email when another member with that expertise is ready to engage!</p>\n\n  <ion-list radio-group>\n    <ion-list-header>\n      SKILLS:\n    </ion-list-header>\n    <div id="indicator" class="{{isLoading ? \'show-indicator\' : \'hide-indicator\'}}">\n      <ion-spinner name="crescent"></ion-spinner>\n    </div>\n    <ion-item *ngFor="let item of skillList">\n      <ion-label>{{item}}</ion-label>\n      <ion-radio *ngIf="skillQty === 1" (ionSelect)="selectedSkill(item)"></ion-radio>\n      <ion-checkbox *ngIf="skillQty > 1"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <div class="form-details" *ngIf="!isLoading">\n    <p class="info strong">Provide details on where you need help (500 characters)</p>\n    <form [formGroup]="formGroup">\n      <textarea #myInput id="myInput" rows="5" formControlName="details" [maxLength]="maxChar" (keyup)="resizeInput()" [(ngModel)]="details"></textarea>\n      <p class="info">\n        <strong>{{maxChar - consumeChar}}</strong> character left</p>\n      <button ion-button round outline [disabled]="!formGroup.valid" (click)="submitSkill()">Submit</button>\n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\mentor\mentor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], MentorPage);
    return MentorPage;
}());

//# sourceMappingURL=mentor.js.map

/***/ })

});
//# sourceMappingURL=20.js.map