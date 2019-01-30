import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from '../../providers/location/location';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, 
    public locationProvider: LocationProvider) {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap(){
    this.locationProvider.getCurrentPosition().then((position: any) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI : true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(latLng)
    }, (err) => {
      console.log("Error Fetching Location",err);
    });
  }

  addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true,
    });

    var infowindow = new google.maps.InfoWindow();

    var oldLat = marker.getPosition().lat();
    var oldLng = marker.getPosition().lng();
    infowindow.setContent('<h5>You are here</h5>');
    this.locationProvider.getCurrentLocationName(oldLat, oldLng).then((data) => {
      infowindow.setContent(data);
      infowindow.open(this.map, marker);
    });
  }

}
