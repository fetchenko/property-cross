import {Component, DoCheck, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { HttpService } from '../service/http.service';
import { SelectedLocationService } from '../service/selected-location-service';
import { LocalStorageService } from 'angular-2-local-storage';

import { Location } from '../service/lotacion';

import { servers } from '../app-const-servers';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, DoCheck {
  servers = servers;
  result: string[];
  favesNum = 100;
  favourites: any[] = [];
  favourite: any;

  selectedLocation: Location;
  subscription: Subscription;

  options: any = {
    action: 'search_listings',
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    page: 1,
    number_of_results: 15,
    place_name: 'London',
    property_type: 'flat',
    bathroom_min: 0,
    bathroom_max: 4
  };

  constructor(private http: HttpService,
              private selectedLocationService: SelectedLocationService,
              private localStorageService: LocalStorageService) {}

  ngOnInit() {
    /* location from search */
    this.subscription = this.selectedLocationService.getSelectedLocation()
      .subscribe((selectedLocation) => {
        this.selectedLocation = selectedLocation;
      });
    /* require property */
    this.http.getJsonpData(this.options)
      .map((resp: any) => {
        return resp.json();
      })
      .subscribe((resp: any) => {
        this.result = resp['response']['listings'];
      });
    /* faves from LS */
    for (let index = 0; index < this.localStorageService.length(); index++) {
      let key = 'favourite' + index.toString();
      this.favourite = this.localStorageService.get(key);
      this.favourites.push(JSON.parse(this.favourite));
    }
  }

  ngDoCheck() {
  /*  console.log(this.result);
   if (this.selectedLocation && (this.options.place_name !== this.selectedLocation.country_name)) {
      this.options.place_name = this.selectedLocation.city_name;
    }*/
  }

  searchProperties() {
    this.http.getJsonpData(this.options)
      .map((resp: any) => {
        return resp.json();
      })
      .subscribe((resp: any) => {
        this.result = resp['response']['listings'];
      });
  }

  /* favourite to LS */
  saveFavourite(propertyResponse: any) {
    let key;
    key = 'favourite' + this.localStorageService.length().toString();
    this.localStorageService.set(key, JSON.stringify(propertyResponse));
  }
}
