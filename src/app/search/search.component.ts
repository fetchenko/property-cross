import {Component, DoCheck, OnInit} from '@angular/core';
import { Cities } from '../service/cities';
import { Response } from '@angular/http';

import { HttpService } from '../service/http.service';
import { SelectedSityService } from '../service/selected-city-service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [HttpService]
})
export class SearchComponent implements OnInit, DoCheck {
  private cities: Cities[] = [];
  foundCities: string[] = [];
  city = null;


  constructor(private httpService: HttpService,
    private selectedSityService: SelectedSityService) { }

  ngOnInit() {
    this.httpService.getData()
      .subscribe((data: Response) => this.cities = data.json());
  }

  ngDoCheck() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.city && this.city.length < 1) return this.foundCities = [];
      if (this.foundCities.length === 5) return;
      if (this.city && this.city.toLowerCase() === this.cities[i].name.toLowerCase().substring(0, this.city.length)
        && !this.foundCities.includes(this.cities[i].name)) {
        this.foundCities.push(this.cities[i].name);
      }
    }
  }

  sendSelectedCity(selectedCity: string): void {
    this.selectedSityService.sendSelectedCity(selectedCity);
  }

  clearSelectedCity(): void {
    this.selectedSityService.clearSelectedCity();
  }

  onKey(city: string) {
    this.city = city;
  }

}
