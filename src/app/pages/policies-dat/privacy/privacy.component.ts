import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const mainPanelHome = <HTMLElement>document.getElementsByClassName('dat-main-home')[0];
    mainPanelHome.classList.remove('dat-dark');
  }

}
