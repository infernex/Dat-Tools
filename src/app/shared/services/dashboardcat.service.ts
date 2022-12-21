import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppHandlerService } from './app.handler.service';
import { CoreService } from './core.service';
import { DashboardCat } from '../model/model.api';


@Injectable({
  providedIn: 'root'
})
export class DashboardcatService extends CoreService<DashboardCat, number> {
  constructor(http: HttpClient, private appSrv: AppHandlerService) {
    super(appSrv.getApiURI() + "DashboardCategory", http)
  }


  // //traer dashboard con token cuando el usuario este en sesion
  // getDashIsLogin(id: number): Observable<Dashboard> {

  //   console.log(this.http.get<Dashboard>(this.base + "/" + id + "/exec"));
  //   return this.http.get<Dashboard>(this.base + "/" + id + "/exec");
  // }
}