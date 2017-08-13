import {Component, OnDestroy, OnInit} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latestSearches: Location[] = [];
  location: any;

  constructor (private localStorageService: LocalStorageService) {
  }


  ngOnInit() {
    /* location from LS */
    for (let index = 0; index < this.localStorageService.length(); index++) {
      let key = 'location' + index.toString();
      this.location = this.localStorageService.get(key);
      if (this.location)
        this.latestSearches.push(JSON.parse(this.location));
    }
    this.latestSearches = this.latestSearches.splice(this.latestSearches.length - 6, this.latestSearches.length);
  }
}
