webpackJsonp([9],{

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TripDetailsPageModule", function() { return TripDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trip_details__ = __webpack_require__(502);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TripDetailsPageModule = (function () {
    function TripDetailsPageModule() {
    }
    TripDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__trip_details__["a" /* TripDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__trip_details__["a" /* TripDetailsPage */]),
            ],
        })
    ], TripDetailsPageModule);
    return TripDetailsPageModule;
}());

//# sourceMappingURL=trip-details.module.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripDetailsPage; });
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



var TripDetailsPage = (function () {
    // sashes_image: any;
    // gallery_length: number;
    function TripDetailsPage(loadingCtrl, epxProvider, 
        // private googleMaps: GoogleMaps,
        platform, 
        // public geolocation: Geolocation,
        navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // trip_id: any;
        // location: string;
        // lat: number;
        // lng: number;
        // product_cat: any;
        // trip_gallery: any;
        // title: string;
        // isInterested: boolean;
        this.isLoading = true;
        this.isTapped = false;
        this.visibleState = 'visible';
        this.partial_details = navParams.data.data;
        console.log('trip param:', navParams.data.trip);
    }
    TripDetailsPage.prototype.ionViewDidLoad = function () {
        this.loadTripDetails(this.partial_details.ID);
        console.log('ionViewDidLoad TripDetailsPage');
    };
    // ionViewWillUnload(){
    //   this.epxProvider.removeData('trip_details');
    // }
    TripDetailsPage.prototype.memberDetails = function (data) {
        this.navCtrl.push('MemberDetailsPage', { data: data });
    };
    TripDetailsPage.prototype.memberDetailsCoordinator = function (member) {
        var data = {
            ID: member.ID,
            member_since: member.Trip_coordinator_Member_since,
            avatar: member.Trip_coordinator_avatar,
            business_model: member.Trip_coordinator_business_model,
            business_url: member.Trip_coordinator_business_url,
            company: member.Trip_coordinator_company,
            employee: member.Trip_coordinator_employee,
            expert_in: member.Trip_coordinator_expert_in,
            help_with: member.Trip_coordinator_can_help_with,
            industry: member.Trip_coordinator_industry,
            name: member.Trip_coordinator_name,
            personal_description: member.Trip_coordinator_personal_description,
            position: member.Trip_coordinator_position,
        };
        console.log('data', data);
        this.navCtrl.push('MemberDetailsPage', { data: data });
    };
    TripDetailsPage.prototype.memberDetailsTripLeader = function (member) {
        var data = {
            ID: member.ID,
            member_since: member.Trip_leader_Member_since,
            avatar: member.Trip_leader_avatar,
            business_model: member.Trip_leader_business_model,
            business_url: member.Trip_leader_business_url,
            company: member.Trip_leader_company,
            employee: member.Trip_leader_employee,
            expert_in: member.Trip_leader_expert_in,
            help_with: member.Trip_leader_can_help_with,
            industry: member.Trip_leader_industry,
            name: member.Trip_leader_name,
            personal_description: member.Trip_leader_personal_description,
            position: member.Trip_leader_position,
        };
        console.log('data', member);
        this.navCtrl.push('MemberDetailsPage', { data: data });
    };
    //Pull to refresh page
    TripDetailsPage.prototype.forceReload = function (refresher) {
        this.loadTripDetails(refresher);
    };
    //Interested
    TripDetailsPage.prototype.interested = function () {
        var _this = this;
        this.isTapped = true;
        this.epxProvider.getData('ID').then(function (user_id) {
            console.log('interest id', _this.partial_details.ID);
            _this.epxProvider.getTripInterest(_this.partial_details.ID, user_id).subscribe(function (res) {
                _this.navParams.data.trip.trip_interested.interested = res.interest; //Update the trip status from previous page
                _this.partial_details.isInterested = res.interest; //Update the trip status in current page
                _this.isTapped = false;
                if (res.interest) {
                    _this.details.number_of_interested++;
                }
                else {
                    _this.details.number_of_interested--;
                }
                console.log('interest result:', res);
            });
        });
    };
    //get trip details
    TripDetailsPage.prototype.loadTripDetails = function (refresher) {
        var _this = this;
        this.epxProvider.getTripDetails(this.partial_details.ID).subscribe(function (data) {
            _this.details = data;
            console.log('trip details: ', data);
            console.log('trip gallery: ', data.trip_gallery.length);
            // this.gallery_length = Number(data.trip_gallery.length);
            var interested = _this.details.whos_interested;
            _this.whos_interested = Object.keys(interested).map(function (key) { return interested[key]; });
            var going = _this.details.whos_going;
            _this.whos_going = Object.keys(going).map(function (key) { return going[key]; });
            _this.initMap(_this.partial_details.lat, _this.partial_details.lng, _this.partial_details.location);
            _this.isLoading = false;
        });
    };
    TripDetailsPage.prototype.openBrowser = function (url) {
        window.open(url, "_system");
    };
    TripDetailsPage.prototype.tripByTags = function (tag) {
        console.log('tag', tag);
        this.navCtrl.push('TripTagsPage', { data: tag });
    };
    //cordova-plugin-googlemaps
    TripDetailsPage.prototype.initMap = function (lat, long, location) {
        var position = { lat: lat, lng: long };
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 15,
            center: position,
            mapTypeId: 'roadmap'
        });
        var marker = new google.maps.Marker({
            position: position,
            map: this.map,
            title: location
        });
        this.map.setCenter(position);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], TripDetailsPage.prototype, "mapElement", void 0);
    TripDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trip-details',template:/*ion-inline-start:"D:\epx_app\src\pages\trip-details\trip-details.html"*/'<!--\n  Generated template for the TripDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Trip Details</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <!-- <div id="indicator" [class]="isLoading ? \'show-indicator\' : \'hide-indicator\'">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div> -->\n  <div class="gallery">\n    <ion-slides loop="true" autoplay="3000" speed="1000" pager="true" *ngIf="partial_details.trip_gallery.length > 1">\n      <ion-slide *ngFor="let img of partial_details.trip_gallery">\n        <img src="{{img}}" />\n      </ion-slide>\n    </ion-slides>\n    <ion-slides *ngIf="partial_details.trip_gallery.length <= 1">\n      <ion-slide *ngFor="let img of partial_details.trip_gallery">\n        <img src="{{img}}" />\n      </ion-slide>\n    </ion-slides>\n  </div>\n  <div class="content-text">\n    <p class="md-text white">{{partial_details.product_cat}}</p>\n    <p class="lg-text white">\n      <strong class="pre-line" [innerHtml]="partial_details.title | uppercase"></strong>\n    </p>\n  </div>\n  <div class="content-desrip">\n    <p class="sm-text pre-line" [innerHTML]="partial_details.full_content"></p>\n  </div>\n  <div id="indicator" [class]="isLoading ? \'show-indicator\' : \'hide-indicator\'">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n  <div *ngIf="!isLoading">\n    <div class="content-details">\n      \n      <br/>\n      <button ion-button round icon-right outline (click)="interested()" *ngIf="partial_details.sashes_image == \'\'">\n        {{partial_details.isInterested ? "Interested" : "I\'m Interested"}}\n        <ion-icon *ngIf="!isTapped" name="{{partial_details.isInterested ? \'heart\' : \'heart-outline\'}}"></ion-icon>\n        <ion-spinner *ngIf="isTapped" class="process" name="crescent"></ion-spinner>\n      </button>\n\n      <ion-item>\n        <ion-avatar item-end>\n          <img class="coordinator" src="{{details.trip_coordinator.Trip_coordinator_avatar}}" (click)="memberDetailsCoordinator(details.trip_coordinator)">\n        </ion-avatar>\n        <h2 class="primary">{{details.trip_coordinator.Trip_coordinator_name}}</h2>\n        <p>Trip Coordinator</p>\n      </ion-item>\n\n      <ion-grid>\n        <ion-row>\n          <ion-col class="left">\n            <h1>{{details.number_of_registered != null ? details.number_of_registered : 0}}</h1>\n            <p>registrations</p>\n          </ion-col>\n\n          <ion-col class="right">\n            <h1>{{details.number_of_interested != null ? details.number_of_interested : 0}}</h1>\n            <p>interested</p>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <ion-grid class="trip-duration">\n        <ion-row>\n          <ion-col col-4>\n            <p>Trip Duration</p>\n          </ion-col>\n          <ion-col col-8>\n            <p>\n              <span class="md-text black">{{details.Trip_duration}}</span>\n            </p>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col col-4>\n            <p>Start Location</p>\n          </ion-col>\n          <ion-col col-8>\n            <p>\n              <span class="md-text black">{{details.Start_location}}</span>\n            </p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-4>\n            <p>End Location</p>\n          </ion-col>\n          <ion-col col-8>\n            <p>\n              <span class="md-text black">{{details.End_location}}</span>\n            </p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-4>\n            <p>Trip Themes</p>\n          </ion-col>\n          <ion-col col-8 class="tags">\n            <button ion-button round outline small *ngFor="let tag of details.product_tag" (click)="tripByTags(tag)">{{tag}}</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <div class="whos-interested" *ngIf="whos_interested.length > 0">\n      <h1 class="text-center black">Who\'s Interested</h1>\n\n      <ion-scroll scrollX="true">\n        <ion-card *ngFor="let member of whos_interested" (click)="memberDetails(member)">\n          <img class="interested" [src]="member.avatar" />\n          <ion-card-content>\n            <p class="text-center md-text strong">{{member.name}}</p>\n            <p class="text-center sm-text">{{member.member_since}}</p>\n          </ion-card-content>\n        </ion-card>\n      </ion-scroll>\n\n    </div>\n  </div>\n  <div #map id="map"></div>\n  <div *ngIf="!isLoading">\n    <div class="trip-leader">\n      <ion-item>\n        <ion-avatar>\n          <img class="leader" src="{{details.trip_leader.Trip_leader_avatar}}" (click)="memberDetailsTripLeader(details.trip_leader)" />\n        </ion-avatar>\n        <p class="sm-text-important text-center black-important">EPX Trip Leader</p>\n        <p class="text-center gray">Member Since:</p>\n        <p class="text-center gray">{{details.trip_leader.Trip_leader_Member_since | date : "MMMM dd, yyyy"}}</p>\n      </ion-item>\n\n      <div class="leader-name">\n        <p class="strong text-center lg-text">Meet {{details.trip_leader.Trip_leader_name}}, Your Trip Leader</p>\n      </div>\n      <p class="text-center md-text">\n        <span class="strong blue">{{details.trip_leader.Trip_leader_name}}</span> is the\n        <span class="strong blue">{{details.trip_leader.Trip_leader_position}}</span> at\n        <span class="strong blue" (click)="openBrowser(details.trip_leader.Trip_leader_business_url)">{{details.trip_leader.Trip_leader_company}}</span>, a\n        <span class="strong blue">{{details.trip_leader.Trip_leader_business_model}}</span> business in the\n        <span class="strong blue">{{details.trip_leader.Trip_leader_industry}}</span> industry with the\n        <span class="strong blue">{{details.trip_leader.Trip_leader_employee}}</span> employees.</p>\n    </div>\n    <div class="whos-going" *ngIf="whos_going.length > 0">\n      <h1 class="text-center black">Who\'s Going</h1>\n      <ion-item *ngFor="let item of whos_going">\n        <ion-avatar item-start>\n          <img class="going" src="{{item.avatar}}" (click)="memberDetails(item)">\n        </ion-avatar>\n        <p>\n          <span class="strong">{{item.name}}</span> is the\n          <span class="strong pre-line" [innerHtml]="item.position"></span> at\n          <span class="strong blue pre-line" (click)="openBrowser(item.business_url)" [innerHtml]="item.company"></span>, a\n          <span class="strong">{{item.business_model}}</span> in the\n          <span class="strong">{{item.industry}}</span> industry with the\n          <span class="strong">{{item.employee}}</span> employees.</p>\n      </ion-item>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\trip-details\trip-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TripDetailsPage);
    return TripDetailsPage;
}());

//# sourceMappingURL=trip-details.js.map

/***/ })

});
//# sourceMappingURL=9.js.map