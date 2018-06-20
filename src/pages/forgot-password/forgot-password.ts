import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { regexValidators} from '../validators/validator'
import { EpxProvider } from '../../providers/epx/epx';

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
  email_control:AbstractControl;
  formGroup: FormGroup;
  email: string;
  tap: number = 0;
  constructor(private epxProvider: EpxProvider, private formBuilder: FormBuilder, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = formBuilder.group({
      email:['',Validators.compose([
        Validators.pattern(regexValidators.email),
        Validators.required
      ])]
    });

    this.email_control = this.formGroup.controls['email'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  requestPassword(){
    console.log(this.email);
    this.tap++;
    if(this.tap <= 1){
      this.epxProvider.requestForgotPassword(this.email).subscribe(res => {
        if(res.success){
          this.showAlert('Email Sent',res.message, true);
        }
        else{
          this.showAlert('Invalid',res.message, false);
        }
      });
    }
  }
  showAlert(title: string, message: string, success: boolean) {
    this.tap = 0;
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Close',
        handler : data => {
          if(success){
            this.navCtrl.pop();  
          }
        }
      }]
    });
    alert.present();
  }
  closePage(){
    this.navCtrl.pop();
  }
}
