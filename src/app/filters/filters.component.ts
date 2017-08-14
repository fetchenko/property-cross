import {Component, Output, EventEmitter} from '@angular/core';
import { Filters } from '../filters';
import { filterValues } from '../app-const-filter-values';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  filters: Filters = {listing_type: 'buy', sort: 'relevancy', bathrooms: [], beds: [], priceMax: 0, propertyType: '', priceMin: 99999999};
  filterValues = filterValues;

  @Output() onAddFilter = new EventEmitter<Filters>();
  addFilter(filter) {
    this.onAddFilter.emit(filter);
  }

  setListing(listing: string) {
    this.filters.listing_type = listing;
    this.addFilter(this.filters);
  }

  setSort(sort: string) {
    this.filters.sort = sort;
    this.addFilter(this.filters);
  }

  setBeds(bedNum: number) {
    this.filters.beds.push(bedNum);
    this.addFilter(this.filters);
  }

  setProperty(type: string) {
    this.filters.propertyType = type;
    this.addFilter(this.filters);
  }

  setBaths(bathNum: number) {
    this.filters.bathrooms.push(bathNum);
    this.addFilter(this.filters);
  }

}


