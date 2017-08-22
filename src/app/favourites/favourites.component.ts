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

  public isFavourite(property: any) {
    if (this.favourites) {
      for (let index = 0; index < this.favourites.length; index++) {
        if (this.favourites[index]['lister_url'] === property['lister_url'])
          return true;
      }
    }
    return false;
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
}
