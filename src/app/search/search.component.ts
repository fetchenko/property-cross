import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from '../service/http.service';
import { Cities } from '../service/cities';
import { Location } from '../service/lotacion';
import { locations } from '../app-const-countries';

import { SelectedLocationService } from '../service/selected-location-service';
import { LocalStorageService } from 'angular-2-local-storage';
import { TranslateService } from '../translate/translate.service';

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
  public selectedLocation: Location = this.countries[0];
  public city;
  public latestSearches: Location[] = [];
  public location: any;


  constructor(private httpService: HttpService,
    private selectedLocationService: SelectedLocationService,
    private localStorageService: LocalStorageService,
              private _translate: TranslateService) {  }

  ngOnInit() {
    this.httpService.getData()
      .subscribe((data: Response) => this.cities = data.json());
      this.location = this.localStorageService.get('locations');
      if (this.location) {
        this.latestSearches = JSON.parse(this.location);
        this.selectLang(this.latestSearches[this.latestSearches.length - 1].country_code);
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

  public sendSelectedLocation() {
    this.localStorageService.set('selectedLocation', JSON.stringify(this.selectedLocation));
    this.selectedLocationService.sendSelectedLocation(this.selectedLocation);
  }

  public onKey(city: string) {
    this.city = city;
  }

  public setSelectedCity(city: string) {
    this.selectedLocation.city_name = city;
    this.city = city + '  ';
    this.foundCities = [];
    this.saveSearchedLocation();
  }

  public saveSearchedLocation () {
    if (!this.wasSearched())
      this.latestSearches.push(this.selectedLocation);
    if (this.latestSearches.length > 5)
      this.latestSearches = this.latestSearches.splice(this.latestSearches.length - 5, this.latestSearches.length - 1);
    this.localStorageService.set('locations', JSON.stringify(this.latestSearches));
  }

  public setCountry(country: Location) {
    this.selectedLocation = country;
    this.selectLang(this.selectedLocation.country_code);
  }

  selectLang(lang: string) {
    this._translate.use(lang);
  }

  wasSearched() {
    for (let index = 0; index < this.latestSearches.length; index++) {
      if (this.latestSearches[index].city_name === this.selectedLocation.city_name &&
        this.latestSearches[index].country_code === this.selectedLocation.country_code)
        return true;
    }
    return false;
  }
}
