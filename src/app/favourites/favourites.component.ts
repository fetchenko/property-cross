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
    for (let index = 0; index < this.favesNum; index++) {
      let key = 'city' + index.toString();
      if (this.localStorageService.get(key) !== null)
        this.favourites.push(this.localStorageService.get(key));
      console.log(this.favourites);
    }
  }

}
