import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    
    this.formGroup = formBuilder.group({
      details:['',Validators.required]
    });

    this.details_control = this.formGroup.controls['details'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MentorPage');
    this.skillList = this.skillSet();
  }
  resize() {
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
}
