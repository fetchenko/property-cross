import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Location } from './lotacion';

@Injectable()
export class SelectedLocationService {
  private subject = new Subject<any>();

  sendSelectedLocation (location: any) {
    this.subject.next({ text: location });
  }

  getSelectedLocation(): Observable<any> {
    return this.subject.asObservable();
  }
}
