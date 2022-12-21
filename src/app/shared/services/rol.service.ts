import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol, Permission } from '../model/model.api';
import { AppHandlerService } from './app.handler.service';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RolService extends CoreService<Rol, string>{
    constructor(http: HttpClient, private appSrv: AppHandlerService) {
        super(appSrv.getApiURI() + "ApplicationRol", http);
    }

    getAllPermissions(): Observable<Permission[]> {
        return this.http.get<Permission[]>(this.base + "/Permissions", this.httpOptions);
    }
}