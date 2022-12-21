import { Component, OnInit } from '@angular/core';

interface Tools {
  Nombre: string,
  Logo: string
}
@Component({
  selector: 'app-content-dat-analytics',
  templateUrl: './content-dat-analytics.component.html',
  styleUrls: ['./content-dat-analytics.component.scss']
})
export class ContentDatAnalyticsComponent implements OnInit {

  popSel:number;
  _baseImgUrl: string = 'assets/img/Tools/';

  loading:boolean=true;

  grupo1: Tools[] = [
    { Nombre: 'Tableau', Logo: this._baseImgUrl + 'tableau_logo.png' },
    { Nombre: 'PowerBI', Logo: this._baseImgUrl + 'powerbi_logo.png' },
    { Nombre: 'Qlik Sense', Logo: this._baseImgUrl + 'qlik_sense_logo.png' },
    { Nombre: 'Excel', Logo: this._baseImgUrl + 'excel_logo.png'}
  ]

  grupo2: Tools[] = [
    { Nombre: 'R', Logo: this._baseImgUrl + 'r_logo.png'},
    { Nombre: 'RapidMiner', Logo: this._baseImgUrl + 'rapidminer_logo.png'},
    { Nombre: 'Sas', Logo: this._baseImgUrl + 'sas_logo.png'},
    { Nombre: 'Python', Logo: this._baseImgUrl + 'python_logo.png'}
  ]

  grupo3: Tools[] = [
    { Nombre: 'SQL Server', Logo: this._baseImgUrl + 'sqlserver_logo.png' },
    { Nombre: 'MySQL', Logo: this._baseImgUrl + 'mysql_logo.png' },
    { Nombre: 'NodeJs', Logo: this._baseImgUrl + 'nodejs_logo.png' },
    { Nombre: 'Angular', Logo: this._baseImgUrl + 'angular_logo.png' },
    { Nombre: '.Net', Logo: this._baseImgUrl + 'net_logo.png' },
    { Nombre: 'PostgreSQL', Logo: this._baseImgUrl + 'postgresql_logo.png' }
  ]
  constructor() { }

  ngOnInit() {
  }

  updateContent(idSection:number){
    this.loading=true;
   

    setTimeout(() => {
      this.loading=false;
      this.popSel=idSection;

    }, 1000);
  }
}
