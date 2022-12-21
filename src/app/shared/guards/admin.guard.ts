import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppHandlerService } from '../services/app.handler.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    
  constructor(private router: Router, 
    private appSrv: AppHandlerService,
   
    private toastr: ToastrService,) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
  
    //return true;
    if ((this.appSrv.getCurrentUser().isAdmin) || (this.appSrv.getCurrentUser().isInstructor))
      return true;
    else {
      this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message"> <b>Acceso Denegado</b> Por favor consulte con el administrador del sistema."</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-top-center" 
          }
        );
      return false;
    }
  }
}