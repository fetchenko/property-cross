import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { PropertiesComponent } from './properties/properties.component';

const appRoutes: Routes = [
  { path: '', component: SearchComponent},
  { path: 'property', component: PropertiesComponent},
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
