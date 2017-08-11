import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Location } from './lotacion';

@Injectable()
export class SelectedLocationService {
  private subject = new Subject<any>();

  sendSelectedLocation (location: Location) {
    this.subject.next({ text: location });
  }

  clearSelectedLocation() {
    this.subject.next();
  }

  getSelectedLocation(): Observable<Location> {
    return this.subject.asObservable();
  }
}
