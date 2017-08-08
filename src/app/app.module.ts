import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { FiltersComponent } from './filters/filters.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { HttpService } from './service/http.service';
import { PropertiesComponent } from './properties/properties.component';

import { SelectedSityService } from './service/selected-city-service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MenuComponent,
    FiltersComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [ HttpService, SelectedSityService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
