import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddTaskComponent } from '../task-section/dialog-add-task/dialog-add-task.component';
import { DialogAddContactComponent } from '../contact-section/dialog-add-contact/dialog-add-contact.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  btnTop = [
    { name: 'summary', icon: 'pending_actions' },
    { name: 'board', icon: 'dashboard' },
    { name: 'contact', icon: '3p' },
  ];

  constructor(public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openDialogAddTask(status: string) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.taskStatus = status;
  }


  openDialogAddContact() {
    this.dialog.open(DialogAddContactComponent);
  }

}