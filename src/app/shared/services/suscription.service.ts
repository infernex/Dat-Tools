import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppHandlerService } from './app.handler.service';
import { CoreService } from './core.service';
import { Suscription } from '../model/suscription.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService extends CoreService<Suscription, number> {
  constructor(http: HttpClient, private appSrv: AppHandlerService) {
    super(appSrv.getApiURI() + "Suscription", http)
  }

  getUserSuscriptionAct(): Observable<Suscription> {
    return this.http.get<Suscription>(this.base + "/useractual");

  }

}
