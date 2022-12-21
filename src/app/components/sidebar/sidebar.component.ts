import { Component, OnInit } from '@angular/core';
import { DashboardcatService } from 'app/shared/services/dashboardcat.service';
import { AppHandlerService } from 'app/shared/services/services.api';
import { DashboardCat } from 'app/shared/model/model.api';
import { ParametersService } from '../../shared/services/parameters.service';
import { DashboardCategoriaActiva } from '../../shared/model/catdashactiva';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
  { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'ui-1_bell-53', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
  { path: '/table-list', title: 'Table List', icon: 'design_bullet-list-67', class: '' },
  { path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO', icon: 'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];


  catActiva: number = 0;
  catActivaNombre: string = '';
  dashboardCategoriaActiva: DashboardCategoriaActiva;
  dashboardsCat: DashboardCat[];
  dashLabelAllCategories: string = 'Todas las categorias';
  isLogin: boolean;
  isAdminOrInstructor: boolean;
  userName: string;
  modeAdmin: boolean = false;



  //obtener lista de categorias de dashboards existentes
  getCatDashboards() {
    this.dashboardCatSrv.getAll().subscribe(resp => {
      this.dashboardsCat = resp;
      console.log('mostrar categoria dasboards');
      console.log(this.dashboardsCat);
    })
  }
  getClaseCSS(categoria: number): string {
    return (categoria === this.catActiva) ? 'active nav-item' : 'nav-item';

  }
  getClaseCSSMode(): string {
    return (this.modeAdmin) ? 'nav-item active active-pro' : 'nav-item active-pro';

  }


  activarCategoria(categoria: number, categoriaN: string) {

    if (categoria === this.catActiva) { return; }
    this.catActiva = categoria;
    console.log(categoria);
    this.catActivaNombre = categoriaN;

    this.dashboardCategoriaActiva = ({ dashboardCatId: categoria, dashboardCatName: categoriaN });
    this.parameterSrv.categoriaActivaDash$.emit(this.dashboardCategoriaActiva);

  }
  activarModoAdmin() {

    if (!this.modeAdmin) {
      this.parameterSrv.modoAdministrador$.emit(true);
      this.modeAdmin = true;
    }
    else {
      this.parameterSrv.modoAdministrador$.emit(false);
      this.modeAdmin = false;
    }

  }


  constructor(
    private dashboardCatSrv: DashboardcatService,
    private parameterSrv: ParametersService,
    private appSrv: AppHandlerService,) { }



  ngOnInit() {
    this.getCatDashboards();
    this.menuItems = ROUTES.filter(menuItem => menuItem);



    this.isLogin = this.appSrv.isLogin();

    if (this.isLogin) {
      this.userName = this.appSrv.getCurrentUser().userName;

      if (this.appSrv.getCurrentUser().isAdmin || this.appSrv.getCurrentUser().isInstructor) {
        this.isAdminOrInstructor = true;
      }

    }
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
