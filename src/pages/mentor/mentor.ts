import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { regexValidators} from '../validators/validator'
import { EpxProvider } from '../../providers/epx/epx';

@IonicPage()
@Component({
  selector: 'page-mentor',
  templateUrl: 'mentor.html',
})
export class MentorPage {
  @ViewChild('myInput') myInput: ElementRef;
  formGroup: FormGroup;
  details_control:AbstractControl;
  skillList:any;
  skillQty: number = 1;
  details:any;
  maxChar: number = 500;
  consumeChar: number = 0;
  isLoading: boolean = true;
  skill:any;
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private provider: EpxProvider, private alertCtrl:AlertController, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    
    this.formGroup = formBuilder.group({
      details:['',Validators.required]
    });

    this.details_control = this.formGroup.controls['details'];
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MentorPage',this.skill);
    this.initSkillSet();
  }
  resizeInput() {
    if(this.myInput.nativeElement.scrollHeight > 120){
      this.myInput.nativeElement.style.height = (this.myInput.nativeElement.scrollHeight) + 'px';
    }
    console.log(this.myInput.nativeElement.scrollHeight);
    this.consumeChar = this.myInput.nativeElement.value.length;
  }

  initSkillSet(){
    this.provider.getMentorMatchSkills().subscribe(res => {
      this.skillList = res.skills;
      console.log('skill set: ',this.skillList);
      this.isLoading = false
    });
  }
  selectedSkill(item){
    this.skill = item;
    console.log('selected skill',item);
  }
  submitSkill(){
    if(this.skill != undefined || this.skill != ''){
      let loading = this.loadingCtrl.create();
      loading.present().then(() => {
        this.provider.submitMentorMatchSkill(this.skill,this.details).subscribe(res => {
          console.log('result',res);
          loading.dismiss();
          this.presentAlert();
        });
      });
     
    }
    else{
      this.provider.toastMessage('Please select skill');
    }
  }
 
  presentAlert() {
    let alert = this.alertCtrl.create({
      
      title: 'THANK YOU!',
      subTitle: 'Your request is in the route! Be on the lookout for others needing your help and engage as much as you can! Give. Give. Give. With Love and Affection, Your Match-Making Pals @ EPX',
      buttons: ['Ok']
    });
    alert.present();
  }
}
