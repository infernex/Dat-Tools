import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ParametersService, InfoLandingService } from 'app/shared/services/services.api';
import { InfoLanding } from 'app/shared/model/model.api';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  infoLanding: InfoLanding;
  urlResourceSafe: SafeResourceUrl;
  constructor(private parametersSrv: ParametersService,
    private infoLandingSrv: InfoLandingService,
    public sanitizer: DomSanitizer, ) { }

  loading: boolean = true;
  ngOnInit() {

    this.infoLanding = new InfoLanding();
    //emitiendo el estado de footer a mostrar
    this.parametersSrv.activateFullFooter$.emit(true);

    //desactivar el tema Dark
    const mainPanelHome = <HTMLElement>document.getElementsByClassName('dat-main-home')[0];
    mainPanelHome.classList.remove('dat-dark');

    this.getInfo();
  }


  getInfo() {

    this.infoLandingSrv.getById(1).subscribe(resp => {
      this.infoLanding = resp;
      this.urlResourceSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.infoLanding.urlVideo1);
      this.loading = false;
    })

  }

  // document.getElementById("navbar2").style.display = "none";
}
