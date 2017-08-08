import {Component, DoCheck, OnInit} from '@angular/core';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';

import { Subscription } from 'rxjs/Subscription';
import { SelectedSityService } from '../service/selected-city-service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  result: string[];

  selectedCity: any;
  subscription: Subscription;

  options: any = {
    action: 'search_listings',
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    country: 'uk',
    place_name: 'London',
    property_type: 'flat'
  };

  constructor(private http: HttpService,
              private selectedSityService: SelectedSityService) {}

  ngOnInit(): void {
    this.subscription = this.selectedSityService.getSelectedCity()
      .subscribe(selectedCity => { this.selectedCity = selectedCity;
      if (this.selectedCity) this.options.place_name = this.selectedCity.text;
      console.log(this.options);
      });
  }

  searchProperty() {
    this.http.getJsonpData(this.options)
      .map((resp: any) => {
        return resp.json();
      })
      .subscribe((resp: any) => {
        this.result = resp['response']['listings'];
        console.log(this.result);
      });
  }

}
