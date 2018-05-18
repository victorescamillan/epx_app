import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-assist',
  templateUrl: 'assist.html',
})
export class AssistPage {
  @ViewChild(Content) content: Content;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('fab') fab: any;
  assistList: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  isFilter: boolean = false;
  page = 1;
  totalPage = 0;
  oldScrollTop = 0;
  constructor(
    private renderer: Renderer2,
    private cache: CacheService,
    private loadingCtrl: LoadingController,
    private provider: EpxProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssistPage');
    this.loadMemberAssist();
  }
  loadMemberAssist(refresher?) {
    let url = this.provider.business_infinite_url;
    let ttl = this.provider.TTL;
    let delay_type = this.provider.DELAY_TYPE;
    let groupKey = 'assist-list';
    this.page = 1;
    let connected = this.provider.isConnected();
    if (connected) {
      if (refresher) {
        this.provider.getData('ID').then(id => {
          this.provider.getMemberAssist(id, 10, this.page).subscribe(res => {
            let mentor = Observable.of(res.data);
            this.cache.loadFromDelayedObservable(url, mentor, groupKey, ttl, delay_type).subscribe(data => {
              this.assistList = data;
              console.log(this.assistList);
            });
            this.isLoading = false;
            this.page = 1;
            refresher.complete();
          }, error => {
            this.provider.toastMessage('Internal error!');
            this.isLoading = false;
            refresher.complete();
          });
        })
      }
      else {
        this.provider.getData('ID').then(id => {
          this.provider.getMemberAssist(id, 10, this.page).subscribe(res => {
            let assist = Observable.of(res.data);
            this.cache.loadFromObservable(url, assist, groupKey).subscribe(data => {
              this.assistList = data;
              console.log(this.assistList);
            });
            this.totalPage = res.number_of_page;
            this.isLoading = false;
            this.isRefresh = true;
          }, error => {
            this.provider.toastMessage('Internal error!');
            this.isLoading = false;
            this.isRefresh = true;
          });
         
        })
      }
    }
    else {
      this.provider.getData(url).then(data => {
        if (data != null) {
          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(data => {
              this.assistList = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.assistList = data;
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
  //Pull to refresh page
  forceReload(refresher) {
    this.loadMemberAssist(refresher);
  }
  filterAssist() {

  }
  respondToRequest(item) {
    if (item.connected) {
      this.navCtrl.push('ChatPage');
    }
    else {
      this.provider.getData('ID').then(id => {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...',
        });
        loading.present().then(() => {
          this.provider.respondMemberAssist(id, item.ID).subscribe(res => {
            console.log('respondToRequest', res);
            if (res.result == true) {
              this.navCtrl.push('ChatPage');
              item.connected = res.result;
            }
            loading.dismiss();
          }, error => {
            this.provider.toastMessage('Internal error!');
            loading.dismiss();
          });
        });
      });
    }
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.provider.getData('ID').then(id => {
      this.provider.getMemberAssist(id, this.provider.PAGE_SIZE15, this.page + 1).subscribe(res => {
        let assist = res.data;
        for (let i = 0; i < assist.length; i++) {
          this.assistList.push(assist[i]);
          console.log(assist[i]);
        }
        infiniteScroll.complete();
        this.page++;
        this.isLoading = false;
        this.isRefresh = true;
      }, error => {
        this.provider.toastMessage('Internal error!');
        infiniteScroll.complete();
        this.isLoading = false;
        this.isRefresh = true;
      });
    })
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  onScroll(event) {
    console.log('onScroll',event);
    if (event.scrollTop <= 0) {
      this.renderer.removeClass(this.filter.nativeElement, 'overlay');
      this.renderer.removeClass(this.fab._mainButton._elementRef.nativeElement, 'fab-show');
    }
    else if (event.scrollTop - this.oldScrollTop > 10) {
      this.renderer.addClass(this.filter.nativeElement, 'overlay');
      this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
      this.renderer.addClass(this.fab._mainButton._elementRef.nativeElement, 'fab-show');
    }
    else if (event.scrollTop - this.oldScrollTop < 0) {
      this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
    }

    this.oldScrollTop = event.scrollTop;
  }
}
