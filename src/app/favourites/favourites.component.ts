import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: any[] = [];
  favesNum = 100
  constructor  (private localStorageService: LocalStorageService) { }

  ngOnInit() {
    let favourite;
    for (let index = 0; index < this.favesNum; index++) {
      let key = 'faves' + index.toString();
      if (this.localStorageService.get(key) !== null) {
        favourite = this.localStorageService.get(key);
        this.favourites.push(favourite);
      }
    }
  }

}
