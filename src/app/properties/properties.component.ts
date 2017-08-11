import {Component, DoCheck, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { HttpService } from '../service/http.service';
import { SelectedLocationService } from '../service/selected-location-service';
import { LocalStorageService } from 'angular-2-local-storage';

import { Location } from '../service/lotacion';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, DoCheck {
  result: string[];
  favesNum = 100;
  favourites: any[] = [];

  selectedLocation: Location = null;
  selectedCity: any;
  subscription: Subscription;

  options: any = {
    action: 'search_listings',
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    page: 2,
    number_of_results: 15,
    country: 'uk',
    place_name: 'London',
    property_type: 'flat',
    bathroom_min: 3,
    bathroom_max: 3
  };

  constructor(private http: HttpService,
              private SelectedLocationService: SelectedLocationService,
              private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.subscription = this.SelectedLocationService.getSelectedLocation()
      .subscribe((selectedLocation) => this.selectedLocation = selectedLocation);
    this.http.getJsonpData(this.options)
      .map((resp: any) => {
        return resp.json();
      })
      .subscribe((resp: any) => {
        this.result = resp['response']['listings'];
      });
    for (let index = 0; index < this.favesNum; index++) {
      let key = 'faves' + index.toString();
      this.favourites.push(this.localStorageService.get(key));
    }
  }

  ngDoCheck() {
    if (this.selectedCity && this.selectedCity.text !== this.options.place_name) {
      this.options.place_name = this.selectedCity.text;
      this.searchProperties();
    }
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

  addFaves(propertyResponse: any) {
    let key;
    if (this.localStorageService.length() >= this.favesNum) {
      return;
    }
    key = 'faves' + this.localStorageService.length().toString();
    this.localStorageService.set(key, propertyResponse.toString());
  }
}
