import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';
import { CloudinaryResource, Dashboard, EstadosDashboard, Suscription } from '../shared/model/model.api';
import { ToastrService } from 'ngx-toastr';
import { AppHandlerService } from '../shared/services/services.api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DashboardCat } from '../shared/model/dashboardcat.model';
import { DashboardcatService } from '../shared/services/dashboardcat.service';
import { SuscriptionService } from '../shared/services/suscription.service';
import { HttpClient } from '@angular/common/http';
// import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { PortafolioHomeService } from '../shared/services/portafolio-home.service';
import { ParametersService } from '../shared/services/parameters.service';
import { EditDashboardComponent } from '../edit-dashboard/edit-dashboard.component';
import { FileTypes } from 'app/shared/model/constantes';
import { UploadFileComponent } from 'app/shared/upload-file/upload-file.component';




interface Dasha {
  nombre: string;
  descripcion: string;
  fuentes: string;
  periocidad: string;
  herramientaCreacion: string;
  notasMetodologicas: string;
  acceso: string;
  img: string;
  fkcategoriaID: number;
}
export interface DashboardImage {
  dashboardImageId: number;
  fkDashboardId: number;
  name: string;
  url: string;
  description: string;
}
interface DashIMG {
  img: string;
}

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  //@Output() idMenu: EventEmitter<number> = new EventEmitter<0>();

  //Arreglo de imagenes provisional 
  dashboardIMG: DashIMG[] = [
    {
      img: './assets/img/Dashboards/dash-College-Admissions.png',
    },
    {
      img: './assets/img/Dashboards/dash-S&P-Economic-Indicators.png',
    },
    {
      img: 'https://res.cloudinary.com/djokqylda/image/upload/v1588091136/Dat-Training/Imagenes%20Demo/career-default_iqnaov.png',
    },
    {
      img: './assets/img/Dashboards/DashEXP1.png'
    },
  ]


  //Arreglo provisional, simula datos de peticion API 
  dashboardAux: Dasha[] = [
    {
      nombre: 'College admissions',
      fuentes: 'fuentes',
      descripcion: 'descripcion',
      notasMetodologicas: 'notas',
      herramientaCreacion: 'Tableu',
      periocidad: 'periocidad',
      acceso: 'free',
      img: './assets/img/Dashboards/dash-College-Admissions.png',
      fkcategoriaID: 1
    },
    {
      nombre: 'S&P Economic Indicators',
      fuentes: 'fuentes',
      descripcion: 'descripcion',
      notasMetodologicas: 'notas',
      herramientaCreacion: 'Tableu',
      periocidad: 'periocidad',
      acceso: 'free',
      img: './assets/img/Dashboards/dash-S&P-Economic-Indicators.png',
      fkcategoriaID: 1
    },
    {
      nombre: 'College admissions',
      fuentes: 'fuentes',
      descripcion: 'descripcion',
      notasMetodologicas: 'notas',
      herramientaCreacion: 'Tableu',
      periocidad: 'periocidad',
      acceso: 'free',
      img: './assets/img/Dashboards/dash-College-Admissions.png',
      fkcategoriaID: 2
    },
    {
      nombre: 'S&P Economic Indicators',
      fuentes: 'fuentes',
      descripcion: 'descripcion',
      notasMetodologicas: 'notas',
      herramientaCreacion: 'Tableu',
      periocidad: 'periocidad',
      acceso: 'free',
      img: './assets/img/Dashboards/dash-S&P-Economic-Indicators.png',
      fkcategoriaID: 2
    },
    {
      nombre: 'College admissions',
      fuentes: 'fuentes',
      descripcion: 'descripcion',
      notasMetodologicas: 'notas',
      herramientaCreacion: 'Tableu',
      periocidad: 'periocidad',
      acceso: 'free',
      img: './assets/img/Dashboards/dash-College-Admissions.png',
      fkcategoriaID: 3
    },
    {
      nombre: 'S&P Economic Indicators',
      fuentes: 'fuentes',
      descripcion: 'descripcion',
      notasMetodologicas: 'notas',
      herramientaCreacion: 'Tableu',
      periocidad: 'periocidad',
      acceso: 'free',
      img: './assets/img/Dashboards/dash-S&P-Economic-Indicators.png',
      fkcategoriaID: 3
    },


  ];


  modeAdmin: boolean = false;
  catActiva: number = 0;
  catActivaNombre: string = '';
  dashboardsCat: DashboardCat[];
  dashboards: Dashboard[];
  dashWithToken: Dashboard;

  //Variables de suscriptor actual
  suscriptionUser: Suscription;
  suscriptorID: string;
  suscriptionType: number;
  // 1 = Global
  // 2 = Dashboard
  suscriptionStatus: number;
  // 1 = activo
  // 2 = inactivo



  dashLabelAllCategories: string = 'Todas las categorias';

  dashboardImgSel: DashboardImage[];
  dashboardAccesSel: number;
  nameDashSel: string;
  imgDashSel: string;
  statusDashSel: string;
  urlDashSel: string;
  descripcionDashSele: string;
  fuentesDashSel: string;
  periocidadDashSel: string;
  notasMetodDashSel: string;
  herraDashSel: string;

  pageName: string = "dashboards";
  accessDash: boolean;
  isLogin: boolean;
  showDash: boolean;
  showImageDash: boolean;
  urlDashSafe: SafeResourceUrl;

  dsDashboard: Dashboard[];
  selectedDashboard: Dashboard;

  //referencia al componente uploadFile
  @ViewChild('uploadfile', { static: false }) uploadFileComponent: UploadFileComponent;
  //referencia al componente de edición
  @ViewChild('editDashboard', { static: false }) editComponent: EditDashboardComponent;
  @Output() idMenu = new EventEmitter<any>();
  constructor(private dashboardSrv: DashboardService,
    private dashboardCatSrv: DashboardcatService,
    private toastr: ToastrService,
    private appSrv: AppHandlerService,
    public sanitizer: DomSanitizer,
    private suscriptionSrv: SuscriptionService,
    private portHome: PortafolioHomeService,
    private parameterSrv: ParametersService
  ) {

  }

  add() {
    this.editComponent.add();
  }
  edit(id: number) {
    this.editComponent.edit(id);
  }
  onObjectCreated(curso: Dashboard) {
    //actualizar listado
    // let dsTmp = [...this.dsDashboard];
    // dsTmp.push(curso);
    // this.dsDashboard = dsTmp;

    //actualizar listado
    if (this.catActiva == 0) {
      this.getDashboards();
    }
    else {
      this.getDashboardsC(this.catActiva);
    }

    //cerrar
    this.editComponent.closeDialog();
    this.toastr.info(
      '<span data-notify="icon" class="now-ui-icons ui-1_check"></span><span data-notify="message">Dashboard <b>agregado</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-bottom-center"
      }
    );
    //this.toastr.info('Registro creado de manera satisfactoria.', 'Admin Course');
  }

  onObjectUpdated(curso: Dashboard) {
    //actualizar listado
    // let dsTmp = [...this.dsDashboard];
    // dsTmp[this.dsDashboard.indexOf(this.selectedDashboard)] = curso;
    // this.dsDashboard = dsTmp;

    if (this.catActiva == 0) {
      this.getDashboards();
    }
    else {
      this.getDashboardsC(this.catActiva);
    }
    //cerrar
    this.editComponent.closeDialog();
    this.toastr.info(
      '<span data-notify="icon" class="now-ui-icons ui-1_check"></span><span data-notify="message">Dashboard <b>Actualizado</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-bottom-center"
      }
    );
    //this.toastr.info('Registro actualizado de manera satisfactoria.', 'Admin Course');
  }

  onObjectDeleted(curso: Dashboard) {
    console.log("entra en delete");

    //actualizar listado
    // let index = this.dsDashboard.indexOf(this.selectedDashboard);
    // this.dsDashboard = this.dsDashboard.filter((val, i) => i != index);

    if (this.catActiva == 0) {
      this.getDashboards();
    }
    else {
      this.getDashboardsC(this.catActiva);
    }
    //cerrar
    this.editComponent.closeDialog();
    //this.toastr.info('Registro eliminado de manera satisfactoria.', 'Admin Course');
  }
  ngOnInit() {
    this.isLogin = this.appSrv.isLogin();
    this.parameterSrv.showPageName$.emit(this.pageName);
    this.parameterSrv.modoAdministrador$.subscribe(status => {
      this.modeAdmin = status;
      console.log(this.modeAdmin)
    });

    this.parameterSrv.categoriaActivaDash$.subscribe(status => {
      this.activarCategoria(status.dashboardCatId, status.dashboardCatName);
      console.log(this.modeAdmin)

    });
    this.catActivaNombre = this.dashLabelAllCategories;
    this.getUserSuscription();
    this.getDashboards();
    this.getCatDashboards();

    // this.portHome.mnselect$.next(16);



  }

  getClaseCSS(categoria: number): string {
    return (categoria === this.catActiva) ? 'cat-ativate' : '';

  }

  activarCategoriaDash(categoria: number) {
    if (categoria === this.catActiva) { return; }
    this.catActiva = categoria;
    console.log(categoria);
    //this.catActivaNombre = categoriaN;

    if (categoria == 0) {
      this.getDashboards();
    }
    else {
      this.getDashboardsC(categoria);
      //this.dashboardsCat = [];
      //this.getCatDashboards();
    }

  }

  activarCategoria(categoria: number, categoriaN: string) {

    if (categoria === this.catActiva) { return; }
    this.catActiva = categoria;
    console.log("seleccion de categoria")
    console.log(categoria);
    this.catActivaNombre = categoriaN;

    if (categoria == 0) {
      this.getDashboards();
    }
    else {
      this.getDashboardsC(categoria);
      //this.dashboardsCat = [];
      //this.getCatDashboards();
    }

  }

  dashSelected(idDash: number) {
    this.accessDash = false;
    //document.getElementById("modal-center").style.display = "block";


    this.dashboards.forEach(dash => {
      // console.log(idDash);

      if (dash.dashboardId == idDash) {
        console.log("Entra al IF de idDash con id")
        this.nameDashSel = dash.nombre;
        this.imgDashSel = dash.urlImage;
        this.statusDashSel = dash.estado;
        this.herraDashSel = dash.dashboardTypeName;
        this.fuentesDashSel = dash.fuentes;
        this.periocidadDashSel = dash.periocidad;
        this.notasMetodDashSel = dash.notasMetod;
        this.descripcionDashSele = dash.descripcion;
        this.dashboardImgSel = dash.dashboardImage;
        this.dashboardAccesSel = dash.fkItemTYpe;

        if (this.isLogin && dash.fkItemTYpe == 2) {

          this.accessDash = true;
          // this.showImageDash = true;
          // this.showDash = true;
          // this.getDashboardWToken(idDash);
        }
        else if (this.isLogin && dash.fkItemTYpe == 1) {
          this.getUserSuscription();

          console.log(this.suscriptionStatus);
          console.log(this.suscriptionType);

          if ((this.suscriptionType == 1 && this.suscriptionStatus == 1) || (this.suscriptionType == 2 && this.suscriptionStatus == 1)) {

            console.log('entra en el IF');

            this.accessDash = true;
          }
          else {
            console.log('NO entra en el IF');
            this.accessDash = false;
            this.ObtenerSuscripcionToast();
          }


        }
        // else if (dash.estado == EstadosDashboard.Publico) {
        //   this.showDash = true;
        //   this.showImageDash = false;
        //   this.getDashboardPublicWToken(idDash);

        // }
        else {
          this.IniciarSesionToast();
          this.accessDash = false;
          this.showDash = false;
          this.showImageDash = true;
        }
      }
      else {
        console.log('no entra en hay error de coincidencias');

      }
    });
  }



  //trayendo dashboard privado  
  getDashboardWToken(id: number) {
    console.log('Entra token');
    this.showDash = false;
    this.dashboardSrv.getDashIsLogin(id).subscribe(resp => {
      this.dashWithToken = resp;
      console.log(resp.urlTableau);
      this.urlDashSel = this.dashWithToken.urlTableau;
      //this.urlDashSel= "https://tableau.dat-analytics.com/views/Regional/College?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link#2"
      this.urlDashSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDashSel);
      console.log('AQUI------S')
      console.log(this.urlDashSafe)

      //mientras trae el dashboard no mostrar nada
      if (this.urlDashSafe != null) {
        this.showDash = true;
      }
    })
  }


  getDashboardPublicWToken(id: number) {
    this.showDash = false;
    this.dashboardSrv.getDashPublic(id).subscribe(resp => {
      this.dashWithToken = resp;
      //console.log(this.dashWithToken);
      this.urlDashSel = this.dashWithToken.urlTableau;
      // this.urlDashSel= "https://tableau.dat-analytics.com/views/Regional/College?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link#2"
      this.urlDashSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDashSel);

      //mientras trae el dashboard no mostrar nada
      if (this.urlDashSafe != null) {
        this.showDash = true;
      }
    })

  }
  //Obtener la informacion de suscripcion del usuario activo
  getUserSuscription() {
    this.suscriptionSrv.getUserSuscriptionAct().subscribe(resp => {

      //console.log(resp);

      if (resp != null) {
        this.suscriptionUser = resp;
        this.suscriptorID = this.suscriptionUser[0].fkUserId;
        this.suscriptionStatus = this.suscriptionUser[0].fkStatusId;
        this.suscriptionType = this.suscriptionUser[0].suscriptionType;

        console.log(this.suscriptionUser[0].fkUserId);
      }
      else {
        this.ObtenerSuscripcion(17);
      }


    })
  }

  getDashboards() {
    this.dashboardSrv.getAll().subscribe(resp => {
      this.dashboards = resp;
      console.log('mostrar dasboards');
      console.log(this.dashboards);

      //al iniciar -cuando el usuario esta en sesion-
      this.nameDashSel = this.dashboards[0].nombre;
      this.imgDashSel = this.dashboards[0].urlImage;
      this.statusDashSel = this.dashboards[0].estado;
      //this.urlDashSel = this.dashboards[0].url;

      if (this.isLogin == true) {
        console.log("entra")
        //this.getDashboardWToken(this.dashboards[0].dashboardId);
      }
      else if (this.statusDashSel == EstadosDashboard.Publico) {
        //this.getDashboardPublicWToken(this.dashboards[0].dashboardId);
        this.showImageDash = false;
        this.showDash = true;

      } else {
        this.showImageDash = true;
        this.showDash = false;
      }

    })


  }

  //traer dashboards filtrados por categoria seleccionada
  getDashboardsC(ca: number) {
    this.dashboardSrv.getDashCat(ca).subscribe(resp => {
      this.dashboards = resp;
      console.log('mostrar dasboards por cat');
      console.log(this.dashboards);
    })
  }

  //obtener lista de categorias de dashboards existentes
  getCatDashboards() {
    this.dashboardCatSrv.getAll().subscribe(resp => {
      this.dashboardsCat = resp;
      console.log('mostrar categoria dasboards');
      console.log(this.dashboardsCat);
    })
  }

  //Sidebar con fondo azul
  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    // document.getElementById("main").style.marginLeft = "300px";
    document.getElementById("mySidenav").style.left = "0";
    document.getElementById("open").style.display = "none";
    // document.getElementById("titlePor").style.display ="none"; 
    document.getElementById("mySidenav").style.display = "block";
    // if (this.showImageDash)
    //   document.getElementById("imgDash").style.width = "77%";
    //document.getElementById("contenedor-dash").style.marginTop="50%";
  }


  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidenav").style.left = "-100px";
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("open").style.display = "block";
    // document.getElementById("titlePor").style.display ="block"; 

    //if (this.showImageDash)
    //document.getElementById("imgDash").style.width = "60%";
    //document.getElementById("contenedor-dash").style.marginTop="0";
  }

  updateMnSel(pOpt: number) {
    this.portHome.mnselect$.next(pOpt);
    // this.idMenu.emit({ menuSelected: pOpt });
    // document.getElementById("navbar2").style.display = "none";

    setTimeout(() => {
      this.toastr.info('Inicie sesión o registrese para visualizar e intereactuar con los tableros en vivo. ', '', {
        positionClass: 'toast-bottom-left'
      });
    }, 1000);
  }
  ObtenerSuscripcion(pOpt: number) {
    this.portHome.mnselect$.next(pOpt);

    // this.idMenu.emit({ menuSelected: pOpt });
    // document.getElementById("navbar2").style.display = "none";
    // document.getElementById("modal-center").style.visibility = "hidden";
    // document.getElementById("modal-center").style.display = "none";


    //   setTimeout(() => {
    //     this.toastr.info('Adquiera una suscripcion ', '', {
    //       positionClass: 'toast-bottom-left'
    //     });
    //   }, 1000);
  }
  ObtenerSuscripcionToast() {
    setTimeout(() => {
      this.toastr.info('Si desea interactuar le invitamos a adquirir una suscripcion', '', {
        positionClass: 'toast-bottom-left'
      });
    }, 1000);
  }
  IniciarSesionToast() {
    setTimeout(() => {
      this.toastr.info('Inicie sesión o registrese para visualizar e intereactuar con los tableros en vivo. ', '', {
        positionClass: 'toast-bottom-left'
      });
    }, 1000);
  }



}
