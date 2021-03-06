import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SharedProvider } from '../../providers/shared/shared';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  firstName: any;
  middleName: any;
  lastname: any;
  username: any;
  password: any;
  confirmPassword: any;
  email: any;
  mobile: number;
  user: UserModel;
  updateForm: any;
  error: any;

  constructor(public navCtrl: NavController, public storage: Storage, 
    public authProvider: AuthProvider, public sharedProvider: SharedProvider) {}

  ngOnInit() {
    this.storage.get('user').then((data) => {
      this.user = data;
      this.firstName = this.user.firstName;
      this.middleName = this.user.middleName;
      this.lastname = this.user.lastname;
      this.username = this.user.username;
      this.password = this.user.password;
      this.confirmPassword = this.user.confirmPassword;
      this.email = this.user.email;
      this.mobile = this.user.mobile;
    })

    this.updateForm = new FormGroup({
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

  update() {
    this.user = this.updateForm.value;
    this.sharedProvider.showLoader('Updating. Please wait...!');
    if(this.user.password == this.user.confirmPassword) {
      this.authProvider.update(this.user).then((data) => {
        this.sharedProvider.showToast('Updated Successfully!')
        this.sharedProvider.hideLoader();
      });
    } else {
      this.sharedProvider.showToast('Both the passwords should be same!')
      this.sharedProvider.hideLoader();
    }
  }
}
