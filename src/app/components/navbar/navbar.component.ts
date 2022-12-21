import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { User } from 'app/shared/model/model.api';
import { AppHandlerService, UserService } from 'app/shared/services/services.api';
import { DefaultImage } from '../../shared/model/constantes';
import { ParametersService } from '../../shared/services/parameters.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public isCollapsed = true;



  user: User;
  errors: string[] = [];
  showstoggleButton: boolean;
  userName: string;
  urlprofilepicture: string = DefaultImage.urlPictureProfile;
  // logoTraining: string = DefaultImage.urlLogoTraining;
  isAdminOrInstructor: boolean;
  isLogin: boolean;
  infoUserLocalStoage: any;
  pageName: string;


  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private userSrv: UserService,
    private appSrv: AppHandlerService,
    private parameterSrv: ParametersService

  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {

    this.parameterSrv.showPageName$.subscribe(page => {
      this.pageName = page;
    })
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });

    //profile
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
    //this.getInstructors();

  }
  obtenerLocalStorage() {

    this.infoUserLocalStoage = JSON.parse(localStorage.getItem("user"));
    this.userName = this.infoUserLocalStoage.userName;

  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { //asign a function
        html.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };
  logOut() {
    this.appSrv.logOut();
    location.reload();
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
