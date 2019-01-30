import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  loader: any;

  constructor(public http: HttpClient, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello SharedProvider Provider');
  }

  showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  showLoader(message) {
    this.loader = this.loadingCtrl.create({
      content: message,
    });
    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

}
