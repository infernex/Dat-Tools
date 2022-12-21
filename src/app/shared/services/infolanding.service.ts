import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppHandlerService } from './app.handler.service';
import { CoreService } from './core.service';
import { InfoLanding } from '../model/model.api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InfoLandingService extends CoreService<InfoLanding, number>{
    constructor(http: HttpClient, private appSrv: AppHandlerService) {
        super(appSrv.getApiURI() + "infoLandings", http);
    }

}