import { Injectable } from '@angular/core';
import { RouteInfo } from '../model/model.api';
import { AppHandlerService } from '../services/app.handler.service';

@Injectable({
  providedIn: 'root'
})
export class RouteInfoService {
  routes: RouteInfo[];
  constructor(private appSrv: AppHandlerService) { }
  getRoutes(): RouteInfo[] {
    this.routes = [


      { path: '/admin-careers', title: 'Carreras', icon: 'fa-award', get: false, class: '', authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/profile', title: 'Mi perfil', icon: 'fa-user', class: '', get: false, authorized: (this.appSrv.isLogin() && !this.appSrv.isAdmin()) },
      { path: '/profile/my-courses', title: 'Mis cursos', icon: 'fa-book', class: '', get: false, authorized: (this.appSrv.isLogin() && !this.appSrv.isAdmin()) },
      { path: '/admin-user', title: 'Usuarios', icon: 'fa-users-cog', class: '', get: false, authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/enrollments', title: 'Inscripciones', icon: 'fa-chalkboard-teacher', get: false, class: '', authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/admin-dat-class', title: 'Dat-Classes', icon: 'fa-podcast', get: false, class: '', authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/notifications', title: 'Notificaciones', icon: 'fa-bell', class: '', get: false, authorized: (this.appSrv.isLogin()) },
      { path: '/admin-landing', title: 'Landing Page', icon: 'fa-file-image', class: '', get: false, authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/admin-ads', title: 'Anuncios', icon: 'fa-bullhorn', class: '', get: false, authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/admin-blog', title: 'Blog', icon: 'fas fa-newspaper', class: '', get: false, authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/admin-reportesfallos', title: 'Reportes de usuarios', icon: 'fas fa-exclamation-triangle', class: '', get: false, authorized: (this.appSrv.isLogin() && this.appSrv.isAdmin()) },
      { path: '/admin-course', title: 'Administrar Cursos', icon: 'fa-cog', get: false, class: '', authorized: (this.appSrv.isLogin() && (this.appSrv.isAdmin() || this.appSrv.isInstructor())) },
    ];
    return this.routes.filter(x => x.authorized);
  }
}



