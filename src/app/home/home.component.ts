import {Component, OnDestroy, OnInit} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchedCities: string[] = [];
  latestSearches: any[] = [];
  numSearches = 6;

  constructor (private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    for (let index = 0; index < this.numSearches; index++) {
      let key = 'city' + index.toString();
      if (this.localStorageService.get(key) !== null)
        this.latestSearches.push(this.localStorageService.get(key));
    }
  }

  addSearchs(searchs) {
    this.searchedCities.push(searchs);
  }

}
