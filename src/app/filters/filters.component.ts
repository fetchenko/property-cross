import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  public sortList = ['Relevancy', 'Bedroom (low to high)', 'Bedroom (high to low)', 'Price (low to high)', 'Price (high to low)', 'Newest', 'Oldest'];
  public form: FormGroup;

  @Output() onAddFilter = new EventEmitter<FormGroup>();
  addFilter(form) {
    this.onAddFilter.emit(form);
  }

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      listing_type: 'buy',
      sortIndex: 0,
      price: 0,
      property_type: '',
      beds: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ]),
      bathrooms: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ])
    });
    this.form.valueChanges.subscribe(data => this.addFilter(this.form.value));
 }
}
