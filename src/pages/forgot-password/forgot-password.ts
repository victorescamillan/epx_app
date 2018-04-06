import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { regexValidators} from '../validators/validator'

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})


export class ForgotPasswordPage {
  email:AbstractControl;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = formBuilder.group({
      email:['',Validators.compose([
        Validators.pattern(regexValidators.email),
        Validators.required
      ])]
    });

    this.email = this.formGroup.controls['email'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  requestPassword(){
    // if (/^[a-zA-Z0-9@.]+$/.test(this.email)) {
    //   // this.navCtrl.pop();
    //   console.log('request sent.')
    // }
    // else{
    //   console.log('invalid email')
    //   this.showAlert('Invalid','Input the correct email.')
    // }
  }
  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  closePage(){
    this.navCtrl.pop();
  }
}
