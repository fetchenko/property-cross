import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SelectedSityService {
  private subject = new Subject<any>();

  sendSelectedCity(city: string) {
    this.subject.next({ text: city });
  }

  clearSelectedCity() {
    this.subject.next();
  }

  getSelectedCity(): Observable<any> {
    return this.subject.asObservable();
  }
}
