import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';


@Injectable()
export class HttpService {
  constructor(private http: Http, private _jsonp: Jsonp) { }

  getData() {
    return this.http.get('assets/cities.json');
  }

  getJsonpData(url: string, options: any) {
    return this._jsonp.request(url, { search: options });
  }
}
