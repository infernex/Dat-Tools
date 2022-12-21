import { Component, HostBinding, ViewChild } from '@angular/core';
import { ParametersService } from '../../shared/services/services.api';
import { ContentDatAnalyticsComponent } from 'app/pages/content-dat-analytics/content-dat-analytics.component';



@Component({
  moduleId: module.id,
  selector: 'footer-cmp',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.css']
})


export class FooterComponent {
  test: Date = new Date();
  fecha: Date;
  anio: number;

  fullFooter: boolean;
  jol: boolean = false;

  //referencia al componente de edición
  @ViewChild('contentDatComponent', { static: false }) contentDatComponent: ContentDatAnalyticsComponent;

  constructor(private parametersSrv: ParametersService) { }
  ngOnInit() {
    this.fecha = new Date;
    this.anio = this.fecha.getFullYear();

    //recibiendo id de curso emitido en componente class
    this.parametersSrv.activateFullFooter$.subscribe(status => {

      this.fullFooter = status;

      //console.log(this.fullFooter);

    });
  }

  chargeContent(idContent: number) {

    this.contentDatComponent.updateContent(idContent);



  }
}
