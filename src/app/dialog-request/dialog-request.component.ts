import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-request',
  templateUrl: './dialog-request.component.html',
  styleUrls: ['./dialog-request.component.scss']
})
export class DialogRequestComponent implements OnInit {
  addTask: boolean = false;


  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogRequestComponent>) { }

  ngOnInit(): void {
  }


  showAddTaskRequest() {
    this.addTask = true;
  }
}