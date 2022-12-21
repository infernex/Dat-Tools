import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class generalConfig {
  private baseUrlWebApi: string = "http://localhost:90/dafAPI/Api/";

  getBaseURLService() {
    return this.baseUrlWebApi;
  }

  getRequestOption() {
    let httpHeader = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': true
    });

    let HeaderOptions = new RequestOptions({
      headers: httpHeader,
      withCredentials: true
    });

    return HeaderOptions;
  }

  getHeader() {
    let httpHeader = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    return httpHeader;
  }

}
