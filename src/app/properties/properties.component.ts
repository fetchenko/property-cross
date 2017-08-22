import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';

import { HttpService } from '../service/http.service';
import { SelectedLocationService } from '../service/selected-location-service';
import { LocalStorageService } from 'angular-2-local-storage';

import { Location } from '../service/lotacion';
import { Servers } from '../servers';
import { servers } from '../app-const-servers';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  public sortList = ['Relevancy', 'bedroom_lowhigh', 'bedroom_highlow', 'price_lowhigh', 'price_highlow',  'newest', 'oldest'];
  private selectedBeds: number[] = [];
  private selectedBaths: number[] = [];

  public servers = servers;
  public currentServer: Servers[] = [];
  public resultProperties: string[];
  public numProperties: number;
  public isLoading = true;

  public pager: any = {};

  private favourites: any[] = [];
  private favourite: any;

  private location: any;
  public selectedLocation: Location;
  private subscription: Subscription;

  public property: any = null;

  public options: any = {
    action: 'search_listings',
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    page: 1,
    number_of_results: 10,
    language: 'en',
    place_name: '',
    sort: 'relevancy',
    listing_type: 'rent',
    price_min: 0,
    price_max: 999999999,
    bedroom_min: 0,
    bedroom_max: 4,
    bathroom_min: 0,
    bathroom_max: 4,
    has_photo: 1
  };

  constructor(private http: HttpService,
              private selectedLocationService: SelectedLocationService,
              private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.location = this.localStorageService.get('selectedLocation');
    this.selectedLocation = JSON.parse(this.location);
    if (this.selectedLocation) {
      this.options.place_name = this.selectedLocation.city_name;
      this.searchProperties(1);
    }
    this.subscription = this.selectedLocationService.getSelectedLocation()
      .subscribe(location => {
        this.location = location;
        this.selectedLocation = this.location.text;
        this.options.place_name = this.selectedLocation.city_name;
        this.searchProperties(1);
      });
      this.favourite = this.localStorageService.get('favourites');
      this.favourite = JSON.parse(this.favourite);
      if (this.favourite)
        this.favourites = this.favourite;
  }

  public isFavourite(property: any) {
    if (this.favourites) {
    for (let index = 0; index < this.favourites.length; index++) {
      if (this.favourites[index]['lister_url'] === property['lister_url'])
        return true;
      }
    }
    return false;
  }

  public searchProperties(page: number) {
    this.options.page = page;
    this.isLoading = true;
    this.identifyUrl(this.selectedLocation);
    this.http.getJsonpData(this.currentServer[0].url, this.options)
      .map((resp: any) => {
        return resp.json();
      })
      .subscribe((resp: any) => {
      this.resultProperties = resp['response']['listings'];
      this.numProperties = resp['response']['total_results'];
      this.setPage(page);
      this.isLoading = false;
      });
  }

  public onFavourite(propertyResponse: any) {
    if  (!this.isFavourite(propertyResponse)) {
      this.favourites.push(propertyResponse);
    } else {
      this.favourites = this.favourites.filter(function (favourite) {
        return favourite['lister_url'] !== propertyResponse['lister_url'];
      });
    }
    this.localStorageService.set('favourites', JSON.stringify(this.favourites));
  }

  private identifyUrl(location: Location) {
    this.currentServer = this.servers.filter(function (server) {
      return server.country_code.toLowerCase() === location.country_code.toLowerCase();
    });
  }

  public onAddFilter(form) {
    this.setOptions(form);
    this.searchProperties(this.options.page);
  }

  private setOptions(form) {
    this.options.listing_type = form.listing_type;
    this.options.sort = this.sortList[form.sortIndex];

    if (form.property_type.includes('All') || form.property_type === '') {
      this.options.property_type = '';
    } else {
      this.options.property_type = form.property_type;
    }

    this.selectedBeds = [];
    for (let index = 0; index < form.beds.length; index++) {
      if (form.beds[index][0])
        this.selectedBeds.push(index);
    }
    this.options.bedroom_min = this.selectedBeds[0];
    this.options.bedroom_max = this.selectedBeds[this.selectedBeds.length - 1];

    this.selectedBaths = [];
    for (let index = 0; index < form.bathrooms.length; index++) {
      if (form.bathrooms[index][0])
        this.selectedBaths.push(index + 1);
    }
    this.options.bathroom_min = this.selectedBaths[0];
    this.options.bathroom_max = this.selectedBaths[this.selectedBaths.length - 1];

    this.options.price_min = form.price[0];
    this.options.price_max = form.price[1];
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.getPager(this.numProperties, page);
  }

  private getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    let pages = _.range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }

  public propertyInfo(property: any) {
    this.property = property;
  }
}
