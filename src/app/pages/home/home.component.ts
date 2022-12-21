import { Component, OnInit, ViewChild } from '@angular/core';
// import { Course, CourseUser, } from 'app/shared/model/model.api';
import { AppHandlerService, ParametersService } from 'app/shared/services/services.api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortafolioHomeService } from '../../shared/services/portafolio-home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mnselectSub: Subscription;

  userDetails;
  mnSel: number = 0;
  //courses: Course[];

  //coursesLogin: Course[];
  smsCourses: string;

  isEnroll: boolean;
  isLogin: boolean;
  userName: string;
  isAdminOrInstructor: boolean;

  //showSpinner: boolean;

  //courseUser: CourseUser;

  sFilterCourse = '';

  page: string = "home";

  loading: boolean = true;
  constructor(
    //private courseSrv: CourseService,
    private appSrv: AppHandlerService,
    private toastr: ToastrService,
    //private courseUserSrv: CourseUserService,
    private router: Router,
    private parametersSrv: ParametersService,
    private portHome: PortafolioHomeService

  ) {
    this.mnselectSub = this.portHome.mnselect$.subscribe($event => {
      this.mnSel = $event
      console.log(this.mnSel)
    });

  }


  ngOnInit() {
    this.parametersSrv.activateFullFooter$.emit(true);

    // this.parametersSrv.pageLiveDatClass$.subscribe(status => {
    //   if (status == true) {
    //     //cambiando el fondo 
    //     const mainPanelHome = <HTMLElement>document.getElementsByClassName('dat-main-home')[0];
    //     mainPanelHome.style.background = '#081826';
    //   }
    // }
    // );

    this.isLogin = this.appSrv.isLogin();

    if (this.isLogin) {
      this.userName = this.appSrv.getCurrentUser().userName;

      if (this.appSrv.getCurrentUser().isAdmin || this.appSrv.getCurrentUser().isInstructor) {
        this.isAdminOrInstructor = true;
      }

    }

    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }
  //REALIZANDO PRUEBAS 
  UpdateMnSel(eventSe) {
    this.mnSel = eventSe;
    console.log(eventSe);
    // eventSe.idMenu.subscribe((event: { menuSelected: number }) => {
    //   this.mnSel = event.menuSelected;
    //   console.log("AQUI ANDO WE ");
    //   console.log(event.menuSelected);
    // });
    //


    //this.newsSelHome= event.NewsSelected;
    // document.getElementById("navbar2").style.display = "none";
  }

  // onActivate(elementRef) {
  //   // this.mnSel = elementRef.menuSelected;
  //   console.log("AQUI ANDO WE 2 ");
  //   console.log(elementRef.menuSelected);
  // }
  onActivate(elementRef) {
    console.log(elementRef.idMenu);


    elementRef.idMenu.subscribe((event: { menuSelected: number; }) => {
      console.log("AQUI ANDO WE 2 ");
      console.log(event);
      this.mnSel = event.menuSelected;
    });


  }

  onScroll($event: Event) {

  }

  logOut() {
    this.appSrv.logOut();
    location.reload();
  }

















}
