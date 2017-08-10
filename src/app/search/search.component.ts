import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import { Cities } from '../service/cities';
import { Response } from '@angular/http';

import { HttpService } from '../service/http.service';
import { SelectedCityService } from '../service/selected-city-service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [HttpService]
})
export class SearchComponent implements OnInit, DoCheck {
  private cities: Cities[] = [];
  foundCities: Cities[] = [];
  city = null;
  country = 'England';


  @Output() onAddSearchs = new EventEmitter<string>();
    addToSearchs(searchs) {
      this.onAddSearchs.emit(searchs);
    }

  constructor(private httpService: HttpService,
    private selectedCityService: SelectedCityService) { }

  ngOnInit() {
    this.httpService.getData()
      .subscribe((data: Response) => this.cities = data.json());
  }

  ngDoCheck() {
    this.foundCities = [];
    let self = this;
    this.cities = this.cities.filter(function (city) {
      return city.country === 'GB';
    });

    if (this.city)
      this.foundCities = this.cities.filter(function (city) {
      return city.name.toLowerCase().search(self.city.toLowerCase()) === 0;
    });
    this.foundCities = this.foundCities.splice(0, 6);
  }


  sendSelectedCity(selectedCity: string): void {
    this.selectedCityService.sendSelectedCity(selectedCity);
  }

  clearSelectedCity(): void {
    this.selectedCityService.clearSelectedCity();
  }

  onKey(city: string) {
    this.city = city;
  }

  setCity(city: string) {
    this.city = city + ' ';
    this.foundCities = [];
  }

  setCountry(country: string) {
    this.country = country;
  }

}
