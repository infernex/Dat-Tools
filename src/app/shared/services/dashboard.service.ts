import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppHandlerService } from './app.handler.service';
import { CoreService } from './core.service';

import { Dashboard } from '../model/model.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends CoreService<Dashboard, number>{
  constructor(http: HttpClient, private appSrv: AppHandlerService) {
    super(appSrv.getApiURI() + "Dashboards", http);
  }

  //traer dashboard con token cuando el usuario este en sesion
  getDashIsLogin(id: number): Observable<Dashboard> {

    console.log(this.http.get<Dashboard>(this.base + "/" + id + "/exec"));
    return this.http.get<Dashboard>(this.base + "/" + id + "/exec");
  }

  //traer dashboard publico con token, sin sesion iniciada
  getDashPublic(id: number): Observable<Dashboard> {
    console.log(this.http.get<Dashboard>(this.base + "/" + id + "/execPublic"));
    return this.http.get<Dashboard>(this.base + "/" + id + "/execPublic");
  }

  //traer dashboard por tipo de categoria seleccionada
  getDashCat(id: number): Observable<Dashboard[]> {

    //console.log(this.http.get<Dashboard>(this.base + "/" + id + "/exec"));
    return this.http.get<Dashboard[]>(this.base + "/" + id + "/ca");
  }



}