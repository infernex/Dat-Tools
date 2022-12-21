import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

export class CoreService<T, ID> {

  protected base: string;
  protected http: HttpClient;
  protected headers: HttpHeaders;
  protected httpOptions: {};

  constructor(base: string, http: HttpClient) {
    this.base = base;
    this.http = http;
  }

  getAll(globalFilter?: string, params?: object): Observable<T[]> {

    //headers
    this.headers = new HttpHeaders();

    if (globalFilter != null) {
      this.headers = this.headers.set("GlobalFilter", globalFilter);
    }

    //options    
    this.httpOptions = {
      headers: this.headers,
      params: params
    };

    //return                                 
    return this.http.get<T[]>(this.base, this.httpOptions);
  }

  getById(id: ID): Observable<T> {
    return this.http.get<T>(this.base + "/" + id, httpOptions);
  }

  create(t: T): Observable<T> {
    return this.http.post<T>(this.base, t, httpOptions);
  }

  update(id: ID, t: T): Observable<T> {
    return this.http.put<T>(this.base + "/" + id, t, httpOptions);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(this.base + '/' + id, httpOptions);
  }

  getHttpOptions(): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return httpOptions;
  }
}