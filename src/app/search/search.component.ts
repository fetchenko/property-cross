import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from '../service/http.service';
import { Cities } from '../service/cities';
import { Location } from '../service/lotacion';
import { locations } from '../app-const-countries';

import { SelectedLocationService } from '../service/selected-location-service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [HttpService]
})

export class SearchComponent implements OnInit, DoCheck {
  public countries: Location[] = locations;
  private cities: Cities[] = [];
  private citiesOfCountry: Cities[] = [];
  public foundCities: Cities[] = [];
  selectedLocation: Location = this.countries[0];
  city = null;
  latestSearches: Location[] = [];
  location: any;

  constructor(private httpService: HttpService,
    private selectedLocationService: SelectedLocationService,
    private localStorageService: LocalStorageService) {  }

  ngOnInit() {
      /* cities from json file */
    this.httpService.getData()
      .subscribe((data: Response) => this.cities = data.json());
    /* latest location from LS */
    for (let index = 0; index < this.localStorageService.length(); index++) {
      let key = 'location' + index.toString();
      this.location = this.localStorageService.get(key);
      this.latestSearches.push(JSON.parse(this.location));
    }
    this.latestSearches = this.latestSearches.splice(this.latestSearches.length - 6, this.latestSearches.length);
  }

  ngDoCheck() {
    this.foundCities = [];
    let self = this;
    this.citiesOfCountry = this.cities.filter(function (city) {
      return city.country === self.selectedLocation.country_code;
    });

    if (this.city)
      this.foundCities = this.citiesOfCountry.filter(function (city) {
      return city.name.toLowerCase().search(self.city.toLowerCase()) === 0;
    });
    this.foundCities = this.foundCities.splice(0, 6);
  }

  /* location to property */
  sendSelectedLocation() {
      this.selectedLocationService.sendSelectedLocation(JSON.stringify(this.selectedLocation));
  }

  onKey(city: string) {
    this.city = city;
  }

  setSelectedCity(city: string) {
    this.selectedLocation.city_name = city;
    this.city = city + ' ';
    this.foundCities = [];
    this.saveSearchedCity();
  }

  /* save location to LS */
  saveSearchedCity () {
    let key = '';
    key = 'location' + this.localStorageService.length().toString();
    this.localStorageService.set(key, JSON.stringify(this.selectedLocation));
  }

  setCountry(country: Location) {
    this.selectedLocation = country;
  }
}
