import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentDatAnalyticsComponent } from 'app/pages/content-dat-analytics/content-dat-analytics.component';
import { ParametersService } from 'app/shared/services/services.api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  fullFooter: boolean;
  fecha: Date;
  anio: number;


  //referencia al componente de edición
  @ViewChild('contentDatComponent', {static: false}) contentDatComponent: ContentDatAnalyticsComponent;

  constructor(private parametersSrv: ParametersService) { }

  ngOnInit() {
    this.parametersSrv.activateFullFooter$.subscribe(status => {
      this.fullFooter = status;

    });
  }
  chargeContent(idContent:number){

    this.contentDatComponent.updateContent(idContent);
    
    

  }
}
