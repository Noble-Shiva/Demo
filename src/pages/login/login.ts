import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserModel } from '../../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  username: any;
  password: any;
  user: UserModel;
  loginForm: any;
  error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider: AuthProvider, public sharedProvider: SharedProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required),
    });
  }

  signIn() {
    this.user = this.loginForm.value;
    this.sharedProvider.showLoader('Signing In. Please wait...!');
    this.authProvider.login(this.user).then((data) => {
      this.sharedProvider.hideLoader();
      this.sharedProvider.showToast('Login Successfull!')
      this.navCtrl.setRoot(TabsPage);
    }).catch((error) => {
      this.sharedProvider.showToast('Invalid Credentials!')
      this.sharedProvider.hideLoader();
    })
  }

  signUp() {
    this.navCtrl.push(SignupPage)
  }

}
