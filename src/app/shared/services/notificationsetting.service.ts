import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppHandlerService } from './app.handler.service';
import { CoreService } from './core.service';
import { Skill, NotificationSetting } from '../model/model.api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class NotificationSettingService extends CoreService<NotificationSetting,number>{
    constructor(http: HttpClient,private appSrv: AppHandlerService){
        super(appSrv.getApiURI() + "NotificationSettings" ,http);
    }

}