import { Component, OnInit } from '@angular/core';
import { Filters } from '../filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  favourites: any[] = [];
  favesNum = 100;
  options: Filters;

  constructor() { }

  ngOnInit() {
  }

}


