import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const mainPanelHome = <HTMLElement>document.getElementsByClassName('dat-main-home')[0];
    mainPanelHome.classList.remove('dat-dark');
  }

}
