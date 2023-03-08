import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  btnTop = [
    { name: 'summary', isClicked: true },
    { name: 'board', isClicked: false },
    { name: 'contact', isClicked: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }


  setActive(button: any): void {
    for (let but of this.btnTop) {
      but.isClicked = false;
    }

    button.isClicked = true;
  }

}