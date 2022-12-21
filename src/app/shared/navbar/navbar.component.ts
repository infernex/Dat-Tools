import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
// import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService, AppHandlerService } from '../services/services.api';
import { User } from '../model/model.api';
import { ToastrService } from 'ngx-toastr';
import { DefaultImage } from '../model/constantes';
import Swal from "sweetalert2";
// import { SignalrLiveService } from '../services/signalrlive.service';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})



export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  display: boolean = false;
  placeholderText = "Escribe aqui tu reporte";

  sidebarDatVisible: boolean = true;

  user: User;
  errors: string[] = [];

  showstoggleButton: boolean;

  userName: string;

  urlprofilepicture: string = DefaultImage.urlPictureProfile;
  logoTraining: string = DefaultImage.urlLogoTraining;

  isAdminOrInstructor: boolean;

  isLogin: boolean;

  public isCollapsed = true;


  // courses: Course[];
  // smsCourses: string = "";

  // careers: Career[];
  // smsCareers: string = "";

  // instructors: User[];
  // smsInstructors: string = "";

  totalCourses: number;
  totalCareers: number;
  totalInstructors: number;

  showLiveButton: boolean;


  // Reportes Variables
  test: Date = new Date();
  fecha: Date;
  anio: string;
  fullFooter: boolean;
  infoUserLocalStoage: any;
  userNameReport: string;
  texto: string;
  // reporteUser: ReporteFallos = new ReporteFallos();

  // live: DatClass;
  @ViewChild("navbar-cmp", { static: false }) button;

  @Input() pageIn: string;

  constructor(location: Location,
    private renderer: Renderer2, private element: ElementRef, private router: Router,
    private userSrv: UserService,
    private appSrv: AppHandlerService,
    // private courseSrv: CourseService,
    // private CareerSrv: CareerService,
    private toastr: ToastrService,
    // private datClassSrv: DatClassService,
    // private signlarLiveSrv: SignalrLiveService,
    // private reportSrv: ReportesfallosService, 
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {

    //mostrando boton abrir o cerrar sidebar


    this.fecha = new Date;
    this.anio = this.fecha.toLocaleDateString();

    var prevScrollpos = window.pageYOffset; 0
    window.onscroll = function () {
      var currentScrollpos = window.pageYOffset; 0
      if (prevScrollpos > currentScrollpos) {
        document.getElementById("navbar2").style.top = "0";
      } else {
        document.getElementById("navbar2").style.top = "-200px";
      }
      prevScrollpos = currentScrollpos;

      if (window.pageYOffset <= 0) {
        // document.getElementById("navbar2").style.opacity="0";
        document.getElementById("navbar2").style.top = "0px";
      }
      else {
        // document.getElementById("navbar2").style.opacity="1";

      }
    }



    // this.signlarLiveSrv.connectcUsertoLiveHub();

    //recibiendo cualquier cambio emitido desde server con signalr al activar o desactivar un LIVE / Dat-Class
    // this.signlarLiveSrv.activateLiveButton.subscribe(liveStatus => {
    //   this.showLiveButton = liveStatus;

    // });

    // this.getLive();
    if (this.pageIn == "home") {
      this.showstoggleButton = false;

    }
    else if (this.pageIn == "admin-layout") {
      this.showstoggleButton = false;

      var navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
      });
    }

    // this.listTitles = ROUTES.filter(listTitle => listTitle);
    if (this.appSrv.isLogin()) {
      this.obtenerLocalStorage();
      this.isLogin = true;
      this.userName = this.appSrv.getCurrentUser().userName;

      if (this.appSrv.getCurrentUser().isAdmin || this.appSrv.getCurrentUser().isInstructor) {
        this.isAdminOrInstructor = true;
      }
      else {
        this.isAdminOrInstructor = false;
      }

      if (this.appSrv.getCurrentUser().UrlProfilePicture == null || this.appSrv.getCurrentUser().UrlProfilePicture == "") {
        this.urlprofilepicture = DefaultImage.urlPictureProfile;

      }
      else {
        this.urlprofilepicture = this.appSrv.getCurrentUser().UrlProfilePicture;
      }

    }
    else {
      this.isLogin = false;
    }

    this.user = new User();

    // this.getCourses();
    // this.getCareers();
    //this.getInstructors();
  }

  // Notificacines de bienvenida al loguearse por primera vez el usuario.
  notificationCareers() {


    if (this.appSrv.getCurrentUser().firstLogin) {

      Swal.fire({
        width: 400,
        icon: 'info',
        html:
          '<strong style="    color: #66615B;   font-size: 14px;"  > Haz click en los titulos de las carreras para acceder  a los cursos de acuerdo a sus intereses.</strong>',
        confirmButtonText:

          ' <a  style= "color: white; "; > Entendido </a> <i class="fa fa-thumbs-up"></i>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        confirmButtonColor: '#1E87F0',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown'
        }
      })
    }
  }


  notificationCourses() {


    if (this.appSrv.getCurrentUser().firstLogin) {

      Swal.fire({
        width: 400,
        icon: 'info',
        html:
          '<strong style="    color: #66615B;   font-size: 14px;"  > Puedes hacer click en los titulos de los cursos o directamente al boton Ir a curso, para acceder a su contenido.</strong>',
        confirmButtonText:

          ' <a  style= "color: white; "; > Entendido </a> <i class="fa fa-thumbs-up"></i>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        confirmButtonColor: '#1E87F0',
        showClass: {
          popup: 'animate__animated animate__fadeInUp'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown'
        }


      })
    }
  }


  // getLive() {
  //   this.datClassSrv.getLive().subscribe(resp => {
  //     this.live = resp;
  //     if (resp != null) {
  //       this.showLiveButton = true;
  //     }

  //   }, (err) => {
  //     this.showLiveButton = false;
  //     this.errors = this.appSrv.getErrosMessages(err);
  //   })
  // }


  // getCourses() {
  //   //console.log("la vieja")
  //   this.courseSrv.getPublicVFtoFcourses().subscribe(resp => {
  //     this.courses = resp;

  //     if (Object.keys(resp).length === 0) {
  //       this.smsCourses = "No hay cursos que mostrar";
  //       this.courses = null;
  //     }

  //     else {
  //       this.courses = resp;
  //       this.totalCourses = resp.length;
  //       this.smsCourses = null;
  //     }

  //   })
  // }

  // getCareers() {
  //   this.CareerSrv.getAll().subscribe(resp => {
  //     this.careers = resp;

  //     if (Object.keys(resp).length === 0) {
  //       this.smsCareers = "No hay carreras que mostrar";
  //       this.careers = null;
  //     }

  //     else {
  //       this.careers = resp;
  //       this.totalCareers = resp.length;
  //       this.smsCareers = null;
  //     }

  //   })
  // }

  // getInstructors() {
  //   this.userSrv.getInstructors().subscribe(resp => {
  //     this.instructors = resp;
  //     if (Object.keys(resp).length === 0) {
  //       this.smsInstructors = "No hay instructores que mostrar";
  //       this.instructors = null;
  //     }

  //     else {
  //       this.instructors = resp;
  //       this.totalInstructors = resp.length;
  //       this.smsInstructors = null;
  //     }

  //   })
  // }


  login() {

    //limpiar errores previos
    this.errors = [];

    this.user.userName = "krisop";
    this.user.password = "Dat2019@";
    //asignar valores a nuestro modelo de datos   
    //this.assignValues();    

    //login
    this.userSrv.login(this.user).subscribe(
      (res: any) => {
        this.appSrv.logIn(res.token);
      },
      err => {
        console.log(err);
        if (err.status == 400)
          this.toastr.error('Usuario o contraseña incorrecta.', 'Login');
        else
          this.toastr.error(err.error.message, 'Login');
      });
  }


  logOut() {
    this.appSrv.logOut();
    location.reload();
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {

      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }

    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');


  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }



  //Version Desktop
  sidebarDatToggle() {
    if (this.sidebarDatVisible) {
      this.sidebarDatClose();
    }

    else {
      this.sidebarDatOpen()
    }

  }


  sidebarDatClose() {
    var side = <HTMLElement>document.getElementsByClassName('sidebar-wrapper')[0];
    side.style.width = '0px';

    var main_panel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    main_panel.style.width = '100%';


    // var off_canvas_sidebar= <HTMLElement>document.getElementsByClassName('off-canvas-sidebar')[0];
    // off_canvas_sidebar.style.width='1px';

    this.sidebarDatVisible = false;

  }

  sidebarDatOpen() {

    var side = <HTMLElement>document.getElementsByClassName('sidebar-wrapper')[0];
    side.style.width = '400px';

    var main_panel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    main_panel.style.width = 'calc(100% - 400px)';


    // var off_canvas_sidebar= <HTMLElement>document.getElementsByClassName('off-canvas-sidebar')[0];
    // off_canvas_sidebar.style.width='260px';

    this.sidebarDatVisible = true;


  }


  // obteniendo LocalStore
  obtenerLocalStorage() {

    this.infoUserLocalStoage = JSON.parse(localStorage.getItem("user"));
    this.userName = this.infoUserLocalStoage.userName;

  }

  // Save

  save() {

    //console.log(this.texto);
    if (this.texto == undefined) {


      this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Escribre una <b>Sugerencia</b></span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-bottom-center"
        }
      );


      return;
    }
    else if (this.texto == "") {
      this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">El <b>Reporte</b> no puede estar vacio</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-bottom-center"
        }
      );
      return;
    }
    else if (this.texto.length < 10) {
      this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">El Reporte es <b>muy corto</b></span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-bottom-center"
        }
      );
      return;
    }



    //   this.reporteUser.reporte = this.texto;
    //   this.reporteUser.fkidUser = this.infoUserLocalStoage.id;
    //   this.reporteUser.estadoReporteFallon = "No corregido";
    //   this.reportSrv.create(this.reporteUser).subscribe(data => {

    //     this.texto = "";
    //     this.toastr.info(
    //       '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">Reporte <b>Enviado</b></span>',
    //       "",
    //       {
    //         timeOut: 4000,
    //         closeButton: true,
    //         enableHtml: true,
    //         toastClass: "alert alert-success alert-with-icon",
    //         positionClass: "toast-bottom-center"
    //       }
    //     );

    //     this.display = false;
    //   }, (err) => {

    //     this.toastr.info(
    //       '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message"><b>' + err + '</b></span>',
    //       "",
    //       {
    //         timeOut: 4000,
    //         closeButton: true,
    //         enableHtml: true,
    //         toastClass: "alert alert-success alert-with-icon",
    //         positionClass: "toast-bottom-center"
    //       }
    //     );

    //   });
  }

  showDialog() {
    this.display = true;
  }

  gotToListPost() {
    this.router.navigateByUrl('list-post-all');
  }

  cancelar() {
    this.display = false;
  }
}