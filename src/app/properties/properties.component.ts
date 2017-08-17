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
  sortList = ['Relevancy', 'bedroom_lowhigh', 'bedroom_highlow', 'price_lowhigh', 'price_highlow',  'newest', 'oldest'];
  selectedBeds: number[] = [];
  selectedBaths: number[] = [];

  servers = servers;
  currentServer: Servers[] = [];
  result: string[];
  resultNum: number;

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
    language: 'en',
    place_name: null,
    centre_point: '51.684183,-3.431481',
    sort: 'relevancy',
    listing_type: 'rent',
    price_min: 0,
    price_max: 999999999,
    bedroom_min: 2,
    bedroom_max: 2,
    bathroom_min: 0,
    bathroom_max: 4,
    has_photo: 1
  };

  constructor(private http: HttpService,
              private selectedLocationService: SelectedLocationService,
              private localStorageService: LocalStorageService) {}

  ngOnInit() {
    /* location from search, home */
    this.location = this.localStorageService.get('selectedLocation');
    this.selectedLocation = JSON.parse(this.location);
  //  console.log(this.selectedLocation);
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

  onAddFilter(form) {
    this.setOptions(form);
    this.searchProperties();
  }

  setOptions(form) {
    console.log(form.beds);
    this.options.listing_type = form.listing_type;
    this.options.sort = this.sortList[form.sortIndex];

    if (form.property_type.includes('All') || form.property_type === '') {
      this.options.property_type = '';
    } else {
      this.options.property_type = form.property_type;
    }

    this.selectedBeds = [];
    for (let index = 0; index < form.beds.length; index++) {
      if (form.beds[index])
        this.selectedBeds.push(index);
    }
    this.options.bedroom_min = this.selectedBeds[0];
    this.options.bedroom_max = this.selectedBeds[this.selectedBeds.length - 1];

    this.selectedBaths = [];
    for (let index = 0; index < form.bathrooms.length; index++) {
      if (form.bathrooms[index])
        this.selectedBaths.push(index + 1);
    }
    this.options.bathroom_min = this.selectedBaths[0];
    this.options.bathroom_max = this.selectedBaths[this.selectedBaths.length - 1];

    this.options.price_min = form.price[0];
    this.options.price_max = form.price[1];
    console.log(this.options);
  }
}
