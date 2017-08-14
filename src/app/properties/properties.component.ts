import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { HttpService } from '../service/http.service';
import { SelectedLocationService } from '../service/selected-location-service';
import { LocalStorageService } from 'angular-2-local-storage';

import { Location } from '../service/lotacion';

import { servers } from '../app-const-servers';
import { Servers } from '../servers';
import {Filters} from '../filters';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  servers = servers;
  currentServer: Servers[] = [];
  result: string[];
  resultNum: number;

  favesNum = 100;
  favourites: any[] = [];
  favourite: any;

  location: any;
  selectedLocation: Location;
  subscription: Subscription;

  filter: Filters;

  options: any = {
    action: 'search_listings',
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    page: 1,
    number_of_results: 15,
    place_name: '',
    property_type: '',
    bathroom_min: 0,
    bathroom_max: 4
  };

  constructor(private http: HttpService,
              private selectedLocationService: SelectedLocationService,
              private localStorageService: LocalStorageService) {}

  ngOnInit() {
    /* location from search, home */
    this.location = this.localStorageService.get('selectedLocation');
    this.selectedLocation = JSON.parse(this.location);
    if (this.selectedLocation) {
      this.options.place_name = this.selectedLocation.city_name;
      this.searchProperties();
    }
    /* location from search */
    this.subscription = this.selectedLocationService.getSelectedLocation()
      .subscribe(location => {
        this.location = location;
        this.selectedLocation = this.location.text;
        this.options.place_name = this.selectedLocation.city_name;
        this.searchProperties();
      });
    /* faves from LS */
    for (let index = 0; index < this.localStorageService.length(); index++) {
      let key = 'favourite' + index.toString();
      this.favourite = this.localStorageService.get(key);
      this.favourites.push(JSON.parse(this.favourite));
    }
  }

  searchProperties() {
    this.identifyUrl(this.selectedLocation);
    this.http.getJsonpData(this.currentServer[0].url, this.options)
      .map((resp: any) => {
        return resp.json();
      })
      .subscribe((resp: any) => {
      this.result = resp['response']['listings'];
      this.resultNum = resp['response']['total_results'];
      });
  }

  /* favourite to LS */
  saveFavourite(propertyResponse: any) {
    let key;
    key = 'favourite' + this.localStorageService.length().toString();
    this.localStorageService.set(key, JSON.stringify(propertyResponse));
  }

  identifyUrl(location: Location) {
    this.currentServer = this.servers.filter(function (server) {
      return server.country_code.toLowerCase() === location.country_code.toLowerCase();
    });
  }

  onAddFilter(filter) {
    this.filter = filter;
    console.log(this.filter);
  }
}
