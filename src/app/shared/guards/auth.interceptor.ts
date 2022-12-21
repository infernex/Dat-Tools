import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AppHandlerService } from '../services/app.handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private appSrv: AppHandlerService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log(req);
        if (this.appSrv.isLogin()) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.appSrv.getToken())
            });

            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401) {
                            this.appSrv.logOut();
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
}