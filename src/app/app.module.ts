import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { FiltersComponent } from './filters/filters.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';

import { HttpService } from './service/http.service';
import { SelectedLocationService } from './service/selected-location-service';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MenuComponent,
    FiltersComponent,
    PropertiesComponent,
    FavouritesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    LocalStorageModule.withConfig({
      prefix: 'app-root',
      storageType: 'localStorage'
    })
  ],
  providers: [ HttpService, SelectedLocationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
