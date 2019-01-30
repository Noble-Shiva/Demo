import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  API_KEY = "AIzaSyBMUq797-zkzoW-BweWwKwWLNRsIAJJTfY";
  
  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello LocationProvider Provider');
  }

  getCurrentPosition() {
    let promise = new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log('Current Position : ', resp);
        resolve(resp);
      }).catch((error) => {
         console.log('Error getting location', error);
        reject(error);
      });
    })

    return promise;
  }

  getCurrentLocationName(lat, lng){
  
    let promise = new Promise((resolve, reject) =>{
      var headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      let header = { headers };
      let URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + lat + ','
        + lng +'&key='
        + this.API_KEY;

      this.http.get(URL).subscribe((data: any) => {
        let totalLocation = [];
        let subLocality = [];
        let subLocale = [];
      
        data.results.forEach(element => {
          if(element.geometry.location_type == "APPROXIMATE"){ 
            totalLocation.push(element.formatted_address);
            subLocality.push(element.address_components);
          }
        });
      
        // for(let locality of subLocality){
        //   for(let locale of locality){
        //     for(let loc of locale.types){
        //       if(loc == "sublocality_level_1"){
        //         subLocale.push(locale.long_name);
        //       }
        //     }
        //   }
        // }
        console.log("subLocale : ", totalLocation[0]);
        resolve(totalLocation[0]);
      });
    })
    return promise;
  }

}
