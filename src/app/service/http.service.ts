import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';


@Injectable()
export class HttpService {
  constructor(private http: Http, private _jsonp: Jsonp) { }

  getData() {
    return this.http.get('assets/cities.json');
  }

  getJsonpData(options: any) {
    return this._jsonp.request('https://api.nestoria.co.uk/api', { search: options });
  }
}
/*
public getJsonpData(response: any) {
  return this.jsonp.request(this.url, { search: response });
}
this.httpService.getJsonpData({action: 'search_listings', encoding: 'json',
  callback: 'JSONP_CALLBACK', place_name: this.changeCity,
  listing_type: this.changeRadio, number_of_results: 10,
  page: this.currentPage})
  .map((resp: Response) => {
    return resp.json();
  })
  .subscribe((resp: Response) => {
    this.respProperties = resp['response']['listings'];
*/
