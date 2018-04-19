webpackJsonp([16],{

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentorPageModule", function() { return MentorPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mentor__ = __webpack_require__(487);
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

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MentorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
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
    function MentorPage(formBuilder, navCtrl, navParams) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.skillQty = 1;
        this.maxChar = 500;
        this.consumeChar = 0;
        this.formGroup = formBuilder.group({
            details: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.details_control = this.formGroup.controls['details'];
    }
    MentorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MentorPage');
        this.skillList = this.skillSet();
    };
    MentorPage.prototype.resize = function () {
        this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
        console.log(this.myInput.nativeElement.value.length);
        this.consumeChar = this.myInput.nativeElement.value.length;
    };
    MentorPage.prototype.skillSet = function () {
        return [
            'Accounting/Finance',
            'Building Brands',
            'Building Culture',
            'Business Strategy',
            'Creating Differentiation',
            'Customer Service',
            'Digital Marketing',
            'Hiring Retention, Firing',
            'Human Resource',
            'International Economics'
        ];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myInput'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object)
    ], MentorPage.prototype, "myInput", void 0);
    MentorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mentor',template:/*ion-inline-start:"D:\epx_app\src\pages\mentor\mentor.html"*/'<!--\n  Generated template for the MentorPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Mentor Match</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p class="sm-text">Every business needs help and as a member of EPX you have access to some of the most brilliant minds in business commited\n    to helping you accelerate success. Simply choose one skill you need help with and provide some detail below.</p>\n  <p class="sm-text">You will be notified by email when another member with that expertise is ready to engage!</p>\n\n  <ion-list radio-group>\n    <ion-list-header>\n      SKILLS:\n    </ion-list-header>\n    <ion-item *ngFor="let item of skillList,">\n      <ion-label>{{item}}</ion-label>\n      <ion-radio *ngIf="skillQty === 1" [value]="item"></ion-radio>\n      <ion-checkbox *ngIf="skillQty > 1"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <p class="info strong">Provide details on where you need help (500 characters)</p>\n  <form [formGroup]="formGroup">\n    <textarea #myInput id="myInput" rows="1" formControlName="details" [maxLength]="maxChar" (keyup)="resize()" [(ngModel)]="details"></textarea>\n    <p class="info"><strong>{{maxChar - consumeChar}}</strong> character left</p>\n    <button ion-button round outline  [disabled]="!formGroup.valid">Submit</button>\n  </form>\n \n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\mentor\mentor.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _d || Object])
    ], MentorPage);
    return MentorPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=mentor.js.map

/***/ })

});
//# sourceMappingURL=16.js.map