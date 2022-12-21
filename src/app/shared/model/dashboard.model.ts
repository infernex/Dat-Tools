import { DashboardImage } from "app/portafolio/portafolio.component";

export class Dashboard {

  dashboardId: number;
  fkDashboardTypeId: number;
  fkDashboardCategoryId: number;
  nombre: string;
  urlTableau: string;
  urlImage: string;
  publicIdCloudinary: string;
  height: number;
  width: number;
  estado: string;
  dashboardTypeName: string;
  fuentes: string;
  descripcion: string;
  notasMetod: string;
  periocidad: string;
  fkItemTYpe: number;
  fechaCreacion: Date;
  fechaModificacion: Date;
  workspaceIdPowerBi: string;
  reportIdPowerBi: string;

  dashboardImage: DashboardImage[];





  constructor() {

    this.dashboardId = 0;
    this.fkDashboardCategoryId = 0;
    this.fkDashboardTypeId = 0;
    this.fechaCreacion;
    this.fechaModificacion;
    this.nombre = null;
    this.urlTableau = null;
    this.urlImage = null;
    this.publicIdCloudinary = null;
    this.height = null;
    this.width = null;
    this.estado = "";
    this.dashboardTypeName = "";
    this.fuentes = null;
    this.descripcion = null;
    this.notasMetod = null;
    this.periocidad = null;
    this.fkItemTYpe = null;
    this.reportIdPowerBi = null;
    this.workspaceIdPowerBi = null;
    this.dashboardImage = null;



  }

}