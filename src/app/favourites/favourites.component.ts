import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  private favourite: any;
  public favourites: any[] = [];

  constructor  (private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.favourite = this.localStorageService.get('favourites');
    if (this.favourite) {
      this.favourites = JSON.parse(this.favourite);
    }
  }

  public unfavourite(index) {
  }

}
