import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { doc, updateDoc } from 'firebase/firestore';
import { SnackBarService } from 'src/services/snack-bar.service';


@Component({
  selector: 'app-dialog-request',
  templateUrl: './dialog-request.component.html',
  styleUrls: ['./dialog-request.component.scss']
})
export class DialogRequestComponent implements OnInit {
  addTask: boolean = false;
  archivTask: boolean = false;
  archivedID: any;
  addContact: boolean = false;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogRequestComponent>, private firestore: Firestore, private messageService: SnackBarService) { }

  ngOnInit(): void {
  }


  showAddTaskRequest() {
    this.addTask = true;
    this.archivTask = false;   
  }


  showArchiveTaskRequest() {
    this.archivTask = true;   
    this.addTask = false;
  }


  async archivedTask() {
    await updateDoc(doc(this.firestore, "tasks", this.archivedID),
      {
        status: 'archived',
        priority: 'archived'
      });
    this.messageService.showSnackMessage('Task has been archived!');

    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);
  }


  showAddContactRequest() {
    this.addContact = true;
    this.addTask = false;
    this.archivTask = false;   
  }
}