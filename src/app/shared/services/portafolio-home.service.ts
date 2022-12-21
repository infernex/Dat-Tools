import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortafolioHomeService {

  mnselect$ = new Subject<any>();
  constructor() { }
}
