webpackJsonp([12],{

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoloTagsPageModule", function() { return SoloTagsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solo_tags__ = __webpack_require__(501);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SoloTagsPageModule = (function () {
    function SoloTagsPageModule() {
    }
    SoloTagsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__solo_tags__["a" /* SoloTagsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__solo_tags__["a" /* SoloTagsPage */]),
            ],
        })
    ], SoloTagsPageModule);
    return SoloTagsPageModule;
}());

//# sourceMappingURL=solo-tags.module.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SoloTagsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
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



var SoloTagsPage = (function () {
    function SoloTagsPage(platform, epxProvider, navCtrl, navParams) {
        this.platform = platform;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.perPage = 0;
        this.totalData = 0;
        this.totalPage = 0;
        this.tag = navParams.data.data;
        console.log('tag', this.tag);
    }
    SoloTagsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var backAction = this.platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
            backAction();
        }, 2);
    };
    SoloTagsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SoloTagsPage');
        this.LoadSolo();
    };
    SoloTagsPage.prototype.soloDetails = function (solo) {
        this.navCtrl.push('SoloDetailsPage', { data: solo });
    };
    SoloTagsPage.prototype.LoadSolo = function (refresher) {
        var _this = this;
        this.epxProvider.getData('ID').then(function (user_id) {
            console.log('user id', user_id);
            _this.epxProvider.getSoloTags(user_id, _this.page, _this.tag).subscribe(function (data) {
                //var solo = Observable.of(Object.keys(data).map(key => data[key])); //Convert object to array since angular accepts array for iteration
                _this.totalPage = data.number_of_page;
                console.log('solo list', data);
                _this.soloList = data.data;
                _this.isLoading = false;
                _this.isRefresh = true;
            });
        });
    };
    SoloTagsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.page++;
        this.epxProvider.getData('ID').then(function (user_id) {
            console.log('user id', user_id);
            _this.epxProvider.getSoloTags(user_id, _this.page, _this.tag).subscribe(function (data) {
                var solo = data.data;
                for (var i = 0; i < solo.length; i++) {
                    _this.soloList.push(solo[i]);
                    console.log(solo[i]);
                }
                infiniteScroll.complete();
                _this.isLoading = false;
                _this.isRefresh = true;
            });
        });
    };
    SoloTagsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-solo-tags',template:/*ion-inline-start:"D:\epx_app\src\pages\solo-tags\solo-tags.html"*/'<!--\n  Generated template for the SoloTagsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{tag | uppercase}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <br />\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n  <ion-card *ngFor="let solo of soloList">\n    <div class="solo-image">\n      <img src="{{solo.thumbnail}}" (click)="soloDetails(solo)">\n    </div>\n\n    <ion-card-content>\n      <h3 class="content-text">\n        <strong class="pre-line" [innerHtml]="solo.title | uppercase"></strong>\n      </h3>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            Price : \n          </ion-col>\n          <ion-col col-10>\n            <p class="content-text">\n              <strong class="text-price">{{solo.price}}</strong>\n            </p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-2>\n            Date :\n          </ion-col>\n          <ion-col col-10>\n            <p class="sm-text">{{solo.start_date}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row *ngIf="solo.product_tag.length">\n          <ion-col col-2>\n            Tags :\n          </ion-col>\n          <ion-col col-10>\n            <button ion-button round outline small *ngFor="let tag of solo.product_tag">{{tag}}</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage">\n    <ion-infinite-scroll-content loadingText="Loading more solo..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\solo-tags\solo-tags.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SoloTagsPage);
    return SoloTagsPage;
}());

//# sourceMappingURL=solo-tags.js.map

/***/ })

});
//# sourceMappingURL=12.js.map