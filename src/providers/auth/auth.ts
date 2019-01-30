import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../model/user.model';

import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  isLogged: boolean = false;
  
  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  login(user: UserModel) {
    let promise = new Promise((resolve, reject) => {
      this.storage.get('user').then((data) => {
        if(!data) {
          reject('false');
          return
        }
         
        if(user.username == data.username && user.password == data.password) {
          this.isLogged = true;
          resolve('true') ;
        } else {
          reject('false') ;
        }
      })
    })

    return promise;
  }

  signUp(user: UserModel) {
    
    let promise = new Promise((resolve, reject) => {
      this.storage.set('user', user).then(() => {
        resolve('true');
      }).catch(() => {
        reject('false');
      });
    })
    
    return promise;
  }

  update(user: UserModel) {
    
    let promise = new Promise((resolve, reject) => {
      this.storage.set('user', user).then(() => {
        resolve('true');
      }).catch(() => {
        reject('false');
      });
    })
    
    return promise;
  }


  isLoggedIn() {
    return this.isLogged;
  }

}
