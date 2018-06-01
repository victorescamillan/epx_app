import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControlName } from '@angular/forms';
declare var CCCometChat : any;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // username: string='jaylord.lagud.hpo@gmail.com';
  // password: string='jaylord.lagud.hpo@gmail.com';
  // username: string = 'stan.lee@hpoutsourcinginc.com';
  // password: string = 'VzOo$)dl';
  username: string;
  password: string;
  
  email_validation: AbstractControl;
  password_validation: AbstractControl;
  formGroup: FormGroup;
  test:FormControlName;
  constructor(private formBuilder: FormBuilder, private modalController: ModalController,
    private epxProvider: EpxProvider,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
      this.formGroup = formBuilder.group({
        email:['',Validators.compose([
          // Validators.pattern(regexValidators.email),
          Validators.required
        ])],
        password:['',Validators.required]
      });
  
      this.email_validation = this.formGroup.controls['email'];
      this.password_validation = this.formGroup.controls['password'];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }


  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  loginUser() {
    let loading = this.loadingCtrl.create({content:'Logging in...'});
    loading.present().then(() => {
      this.epxProvider.getLogin(this.username, this.password).subscribe(result => {
        if (result.authentication) {
          CCCometChat.loginWithUID(result.ID, function success(response) {
            console.log('Logged in as' + result.ID,response);
          }, function failure(error) {
            console.log('Login failure Callback',error);
          });
          this.epxProvider.saveData('ID', result.ID);
          this.epxProvider.saveData('name', result.name);
          this.epxProvider.saveData('email', result.email);
          this.epxProvider.saveData('authentication', result.authentication);
          this.epxProvider.saveData('enable_member', result.enable_member === '1' ? true : false);
          this.epxProvider.saveData('enable_vault', result.enable_vault === '1' ? true : false);
          this.epxProvider.saveData('enable_get_lucky', result.enable_get_lucky  === '1' ? true : false);
          this.epxProvider.saveData('member_details', result);
          loading.dismiss();
          this.navCtrl.setRoot('MenuPage');
        }
        else {
          this.showAlert('Login Failed', 'Invalid username or password');
          loading.dismiss();
        }
      });
    });
  }
  forgotPassword(){
   this.forgotPasswordModal();
  }
  forgotPasswordModal(){
    this.modalController.create('ForgotPasswordPage').present();
  }
  forgotPasswordAlert(){
    let prompt = this.alertCtrl.create({
      title: 'Forgot Password',
      message: "Enter you email address to request password reset.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Enter your email address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Request',
          handler: data => {
            console.log('Request clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
