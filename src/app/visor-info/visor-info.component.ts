import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { generalConfig } from '../generalConfig';

@Component({
  selector: 'app-visor-info',
  templateUrl: './visor-info.component.html',
  styleUrls: ['./visor-info.component.css'],
  providers: [
    generalConfig
  ]
})
export class VisorInfoComponent implements OnInit {
  @Input() mnSel: number;
  @Input() newsSel: number;
  @Output() clVis: EventEmitter<boolean> = new EventEmitter<true>();

  pageTitulo: string;

  constructor() { }

  ngOnInit() {
    
  }

  //para el footer dentro del visor
 //asignando menu y noticia seleccionada
 UpdateMnSel(event) {
  this.mnSel = event.menuSelected;
  //this.newsSelHome= event.NewsSelected;
  
}

  setTitulo(pTitulo: string) {
    this.pageTitulo = pTitulo;
  }

  cerrarVisor() {
    this.clVis.emit(true);
    
  }

}
