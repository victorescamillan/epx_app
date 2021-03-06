import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content, Events } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CacheService } from 'ionic-cache';

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  @ViewChild(Content) content: Content;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('fab') fab: any;
  oldScrollTop = 0;
  businessList: any;
  temp_businessList: Observable<any>;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  totalPage = 0;
  skillsList: any;
  categoryList: any;
  skills: any;
  category: any;
  isFilter: boolean = false;
  constructor(
    private events: Events,
    private alertCtrl: AlertController,
    private renderer: Renderer2,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Keep our cached results when device is offline!
    this.events.subscribe(this.epxProvider.CLOSE_PAGE, value => {
      if (value) {
        navCtrl.popToRoot();
      }
    });
    cache.setOfflineInvalidate(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
    this.LoadBusiness();
    this.loadSkillsCategory();
  }

  LoadBusiness(refresher?) {
    let url = this.epxProvider.business_infinite_url;
    let ttl = this.epxProvider.TTL;
    let delay_type = this.epxProvider.DELAY_TYPE;
    let groupKey = 'business-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    if (connected) {
      this.epxProvider.getBusinessInfinite(this.page).subscribe(data => { //Get data from url/api
        let business = Observable.of(data.data);
        this.totalPage = data.number_of_page;
        if (refresher) {
          this.cache.loadFromDelayedObservable(url, business, groupKey, ttl, delay_type).subscribe(data => {
            this.businessList = Object.keys(data).map(key => data[key]);
            console.log('business:', data);
            refresher.complete();
            this.loadSkillsCategory();
            this.isFilter = false;
          });
        }
        else {
          this.cache.loadFromDelayedObservable(url, business, groupKey, ttl, delay_type).subscribe(data => {
            this.businessList = Object.keys(data).map(key => data[key]);
            console.log('business:', data);
          });
        }
        this.isLoading = false;
        this.isRefresh = true;
      }, error => {
        console.log(error);
        this.epxProvider.toastMessage('Internal Server Error!')
      });
    }
    else {
      this.epxProvider.getData(url).then(data => {
        if (data != null) {
          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(data => {
              this.businessList = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.businessList = data;
            });
          }
          this.isLoading = false;
          this.isRefresh = true;
        }
        else {
          console.log('offline data: ', data);
          refresher.complete();
        }
      });
    }

  }
  forceReload(refresher) {
    this.LoadBusiness(refresher);
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getBusinessInfinite(this.page + 1).subscribe(data => { //Get data from url/api
      let business = data.data;
      let temp = Object.keys(business).map(key => business[key]);

      for (let i = 0; i < temp.length; i++) {
        this.businessList.push(temp[i]);
        console.log(data[i]);
      }
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
      this.page++;
    }, error => {
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  filterBusiness(ev: any) {
    if (!this.isLoading) {
      this.businessList = this.temp_businessList;
      let val = ev.target.value;
      if (val && val.trim() !== '') {
        this.businessList = this.businessList.map((business) => business.filter(function (item) {
          return item.business_name.toLowerCase().includes(val.toLowerCase());
        }));
      }
    }
  }

  businessDetails(business) {
    this.navCtrl.push('BusinessDetailsPage', { data: business });
  }
  loadSkillsCategory() {
    this.skills = '';
    this.category = '';
    this.epxProvider.getBusinessSkillsCategory().subscribe(res => {
      console.log('initSkillsCategory', res)
      this.skillsList = res.skills;
      this.categoryList = res.category;
    });
  }
  onScroll(event) {
    if (event.scrollTop - this.oldScrollTop > 10) {
      this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
      this.renderer.addClass(this.fab._mainButton._elementRef.nativeElement, 'fab-show');
        console.log('scroll down',event.scrollTop - this.oldScrollTop)
    }
    else if (event.scrollTop - this.oldScrollTop < 0) {
      this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
      this.renderer.removeClass(this.fab._mainButton._elementRef.nativeElement, 'fab-show');
      console.log('scroll up',event.scrollTop - this.oldScrollTop)
    }
    this.oldScrollTop = event.scrollTop;
  }
  searchBusiness() {
    this.presentPrompt();
  }
  filterBusienss() {
    if (this.skills === '' && this.category === '' || this.skills == undefined && this.category == undefined) {
      this.epxProvider.toastMessage('Please select skills or category')
      return;
    }
    this.isFilter = true;
    this.isLoading = true;
    this.isRefresh = false;
    this.epxProvider.getBusinessFilter(this.skills, this.category).subscribe(res => {
      console.log('getBusinessFilter', res);
      if (res.result === true) {
        let business: string[] = Object.keys(res.data).map(key => res.data[key]);
        this.businessList = business;
      }
      else {
        this.epxProvider.toastMessage('No results found!');
      }
      this.isLoading = false;
    }, error => {
      console.log('error: ', error);
      this.epxProvider.toastMessage('Internal error.')
      this.isLoading = false;
    })
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Business Search',
      inputs: [
        {
          name: 'name',
          placeholder: 'Input name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.isLoading = true;
            this.isRefresh = false;
            this.isFilter = true;
            this.epxProvider.getBusinessSearch(data.name,this.skills, this.category).subscribe(res => {
              console.log('search result: ', res);
              if (res.result === true) {
                this.businessList = Object.keys(res.data).map(key => res.data[key]);
              }
              else {
                this.epxProvider.toastMessage('No results found!');
              }
              this.isLoading = false;
            }, error => {
              this.epxProvider.toastMessage('Internal error.');
              this.isLoading = false;
            });
          }
        }
      ]
    });
    alert.present();
  }
}
