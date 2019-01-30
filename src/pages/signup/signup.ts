import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel } from '../../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  firstName: any;
  middleName: any;
  lastname: any;
  username: any;
  password: any;
  confirmPassword: any;
  email: any;
  mobile: number;
  user: UserModel;
  signUpForm: any;
  error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authProvider: AuthProvider, public sharedProvider: SharedProvider) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(this.firstName, Validators.required),
      middleName: new FormControl(this.middleName, Validators.required),
      lastname: new FormControl(this.lastname, Validators.required),
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required),
      confirmPassword: new FormControl(this.confirmPassword, Validators.required),
      email: new FormControl(this.email, Validators.required),
      mobile: new FormControl(this.mobile, Validators.required),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp() {
    this.user = this.signUpForm.value;
    this.sharedProvider.showLoader('Signing Up. Please wait...!');
    if(this.user.password == this.user.confirmPassword) {
      this.authProvider.signUp(this.user).then((data) => {
        this.sharedProvider.hideLoader();
        this.sharedProvider.showToast('Signup Successful. Please Login in!');
        this.navCtrl.pop();
      });
    } else {
      this.sharedProvider.showToast('Both the passwords should be same!')
      this.sharedProvider.hideLoader();
    }
  }

}
