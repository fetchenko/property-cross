import {Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public latestSearches: Location[] = [];
  private location: any;

  constructor (private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
      this.location = this.localStorageService.get('locations');
      if (this.location)
        this.latestSearches = JSON.parse(this.location);
  }

  public saveSelectedLocation(location: Location) {
    this.localStorageService.set('selectedLocation', JSON.stringify(location));
  }
}
