import { DashboardImage } from "app/portafolio/portafolio.component";

export class DashboardLAB {

    dashboardId: number;
    fkDashboardCategoryId: number;
    nombre: string;
    url: string;
    urlImage: string;
    height: number;
    width: number;
    estado: string;
    dashboardTypeName: number;
    fuentes: string;
    descripcion: string;
    notasMetod: string;
    periocidad: string;
    fkItemTYpe: number;
    dashboardImage: DashboardImage[];





    constructor() {

        this.dashboardId = null;
        this.fkDashboardCategoryId = null;
        this.nombre = null;
        this.url = null;
        this.urlImage = null;
        this.height = null;
        this.width = null;
        this.estado = null;
        this.dashboardTypeName = null;
        this.fuentes = null;
        this.descripcion = null;
        this.notasMetod = null;
        this.periocidad = null;
        this.fkItemTYpe = null;
        this.dashboardImage = null;



    }

}