import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppHandlerService } from './app.handler.service';
import { CoreService } from './core.service';
import { NotificationAvailable } from '../model/model.api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class NotificationAvailableService extends CoreService<NotificationAvailable,number>{
    constructor(http: HttpClient,private appSrv: AppHandlerService){
        super(appSrv.getApiURI() + "NotificationAvailables" ,http);
    }

}