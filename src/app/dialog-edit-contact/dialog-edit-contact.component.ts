import { Component, OnInit } from '@angular/core';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { doc, getDoc } from 'firebase/firestore';
import { Contact } from 'src/models/contact.class';
import { SnackBarService } from 'src/services/snack-bar.service';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';

@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.scss']
})
export class DialogEditContactComponent implements OnInit {
  contactID: any;
  contactData: any;
  contact: Contact;
  loadSpinner: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditContactComponent>, 
    private firestore: Firestore, 
    public dialog: MatDialog, 
    private messageService: SnackBarService) { }

  ngOnInit(): void {
    this.loadContact();
  }


  async loadContact() {
    const docRef = doc(this.firestore, "contacts", this.contactID);
    const docSnap = await getDoc(docRef);
    this.contactData = docSnap.data();
  }


  async saveContact() {
    this.loadSpinner = true;

    await updateDoc(doc(this.firestore, "contacts", this.contactData.id),
      {
        firstName: this.contactData.firstName,
        lastName: this.contactData.lastName,
        fullName: this.contactData.fullName,
        email: this.contactData.email,
        phone: this.contactData.phone
      });

    setTimeout(() => {
      this.loadSpinner = false;
      this.dialog.closeAll();
      this.messageService.showSnackMessage('Save Changes!');
    }, 2000);
  }


  openDialogArchivedTask(id: any) {
    // const dialog = this.dialog.open(DialogRequestComponent);
    // dialog.componentInstance.showArchiveTaskRequest();
    // dialog.componentInstance.archivedID = id;
  }

}