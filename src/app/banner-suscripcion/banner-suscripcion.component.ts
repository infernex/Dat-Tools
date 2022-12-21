import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banner-suscripcion',
  templateUrl: './banner-suscripcion.component.html',
  styleUrls: ['./banner-suscripcion.component.css']
})
export class BannerSuscripcionComponent implements OnInit {
  @Output() pageTitulo: EventEmitter<string> = new EventEmitter<"">();
  constructor() { }

  ngOnInit() {
    this.pageTitulo.emit("Planes Premiums");
  }

}
