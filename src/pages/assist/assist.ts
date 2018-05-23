import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content, ViewController, Events } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  expertiseList: any;
  expertise: string = '';
  isLoading: boolean = true;
  isRefresh: boolean = false;
  isFilter: boolean = false;
  page = 1;
  totalPage = 0;
  oldScrollTop = 0;
  isNotification: boolean = false;
  constructor(
    private events: Events,
    private viewCtrl: ViewController,
    private renderer: Renderer2,
    private cache: CacheService,
    private loadingCtrl: LoadingController,
    private provider: EpxProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    console.log('navCtrl', navCtrl);
    this.events.subscribe(this.provider.CLOSE_PAGE, value => {
      if (value) {
        navCtrl.popToRoot();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssistPage');
    this.loadMemberAssist();
  }
  closeFilter() {
    this.viewCtrl.dismiss();
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
        this.expertise = '';
        this.provider.getData('ID').then(id => {
          this.provider.getMemberAssist(id, 10, this.page).subscribe(res => {
            let assist = Observable.of(res.data);
            this.cache.loadFromDelayedObservable(url, assist, groupKey, ttl, delay_type).subscribe(data => {
              this.assistList = data;
              this.expertiseList = res.skill;
              console.log(this.assistList);
            });
            this.isLoading = false;
            this.isFilter = false;
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
            console.log('getMemberAssist', res.data);
            this.cache.loadFromDelayedObservable(url, assist, groupKey, ttl, delay_type).subscribe(data => {
              console.log('loadFromObservable', data);
              this.assistList = data;
            });
            // this.assistList = res.data;
            this.totalPage = res.number_of_page;
            this.expertiseList = res.skill;
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
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(data => {
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

    if (this.expertise == '') {
      this.provider.toastMessage('Please select expertise.')
      return;
    }
    this.isFilter = true;
    // this.isLoading = true;
    // this.isRefresh = false;
    let loading = this.loadingCtrl.create({ content: 'Loading...' });
    loading.present().then(()=>{
      this.provider.getData('ID').then(id => {
        this.provider.getMemberAssistFilter(id, this.expertise).subscribe(res => {
          console.log('getMemberAssistFilter', res);
          if (res.result == true) {
            this.assistList = res.data;
          }
          else {
            this.provider.toastMessage('No results found!');
          }
          loading.dismiss();
        }, error => {
          this.provider.toastMessage('Internal Error!');
          loading.dismiss();
        })
      });
    });
    setTimeout(() => {
      loading.dismiss();
    }, 20000);
   
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
    console.log(this.fab);
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
}
