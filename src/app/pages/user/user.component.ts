import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() pageTitulo: EventEmitter<string> = new EventEmitter<"">();
  constructor() { }

  ngOnInit() {
    this.pageTitulo.emit("“Coméntanos sobre tus proyectos o requerimientos, con gusto te apoyaremos”");
    
  }
}
