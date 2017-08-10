import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';
import { FavouritesComponent } from './favourites/favourites.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'property', component: PropertiesComponent},
  { path: 'favourites', component: FavouritesComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule ({
  imports: [
    RouterModule.forRoot(appRoutes,
      {enableTracing: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
