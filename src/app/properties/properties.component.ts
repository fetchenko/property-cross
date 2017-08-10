import {Component, DoCheck, OnInit} from '@angular/core';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';

import { Subscription } from 'rxjs/Subscription';
import { SelectedCityService } from '../service/selected-city-service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, DoCheck {
  result: string[];

  selectedCity: any;
  subscription: Subscription;

  faves: any[] = [];

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
              private SelectedCityService: SelectedCityService) {}

  ngOnInit() {
    this.subscription = this.SelectedCityService.getSelectedCity()
      .subscribe(selectedCity => { this.selectedCity = selectedCity;
      console.log(this.selectedCity );
      });
    this.http.getJsonpData(this.options)
      .map((resp: any) => {
        return resp.json();
      })
      .subscribe((resp: any) => {
        this.result = resp['response']['listings'];
        console.log(this.result);
      });
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
    this.faves.push(propertyResponse);
    console.log(this.faves);
  }

}
