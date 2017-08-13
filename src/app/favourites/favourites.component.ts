import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourite: any;
  favourites: any[] = [];
  favesNum = 100
  constructor  (private localStorageService: LocalStorageService) { }

  ngOnInit() {
    /* faves from LS */
    for (let index = 0; index < this.localStorageService.length(); index++) {
      let key = 'favourite' + index.toString();
      this.favourite = this.localStorageService.get(key);
      if (this.favourite)
        this.favourites.push(JSON.parse(this.favourite));
    }
  }

}
