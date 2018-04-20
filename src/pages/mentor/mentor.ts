import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { regexValidators} from '../validators/validator'

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
  constructor(private alertCtrl:AlertController, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    
    this.formGroup = formBuilder.group({
      details:['',Validators.required]
    });

    this.details_control = this.formGroup.controls['details'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MentorPage');
    this.skillList = this.skillSet();
  }
  resizeInput() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    console.log(this.myInput.nativeElement.value.length)
    this.consumeChar = this.myInput.nativeElement.value.length;
  }
  skillSet(): any{
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
