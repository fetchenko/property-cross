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
  latestSearches: any[] = [];
  numSearches = 6;


  @Output() onAddSearchs = new EventEmitter<string>();
    addToSearchs(searchs) {
      this.onAddSearchs.emit(searchs);
    }

  constructor(private httpService: HttpService,
    private selectedLocationService: SelectedLocationService,
    private localStorageService: LocalStorageService) {  }

  ngOnInit() {
    this.httpService.getData()
      .subscribe((data: Response) => this.cities = data.json());
    for (let index = 0; index < this.numSearches; index++) {
      let key = 'city' + index.toString();
      this.latestSearches.push(this.localStorageService.get(key));
    }
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

  sendSelectedLocation() {
      this.selectedLocationService.sendSelectedLocation(this.selectedLocation);
  }

  onKey(city: string) {
    this.city = city;
  }

  setSelectedCity(city: string) {
    this.selectedLocation.city_name = city;
    this.city = city + ' ';
    this.foundCities = [];
    this.addSearchList();

  }

  addSearchList () {
    let key = '';
    if (this.localStorageService.length() >= this.numSearches) {
      key = 'city' + (this.numSearches - 1);
      this.localStorageService.set(key, this.selectedLocation.city_name);
    } else {
      key = 'city' + this.localStorageService.length().toString();
      this.localStorageService.set(key, this.selectedLocation.city_name);
    }
  }

  setCountry(country: Location) {
    this.selectedLocation = country;
  }

}
