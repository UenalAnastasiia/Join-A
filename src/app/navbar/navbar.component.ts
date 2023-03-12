import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  btnTop = [
    { name: 'summary', isClicked: true, icon: 'pending_actions' },
    { name: 'board', isClicked: false, icon: 'dashboard' },
    { name: 'contact', isClicked: false, icon: '3p' },
  ];

  constructor(public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    setInterval(() => {
      this.checkURL();
    });
  }


  checkURL() {
    if (this.router.url.includes('summary')) {
      this.btnTop[0].isClicked = true;
      this.btnTop[1].isClicked = false;
      this.btnTop[2].isClicked = false;
    } else if (this.router.url.includes('board')) {
      this.btnTop[1].isClicked = true;
      this.btnTop[0].isClicked = false;
      this.btnTop[2].isClicked = false;
    } else if (this.router.url.includes('contact')) {
      this.btnTop[2].isClicked = true;
      this.btnTop[0].isClicked = false;
      this.btnTop[1].isClicked = false;
    }
  }


  setActive(button: any): void {
    for (let but of this.btnTop) {
      but.isClicked = false;
    }

    button.isClicked = true;
  }


  openDialogAddTask() {
    this.dialog.open(DialogAddTaskComponent);
  }

}