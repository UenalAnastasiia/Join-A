import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { doc, getDoc } from 'firebase/firestore';
import { Contact } from 'src/models/contact.class';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-dialog-contact-details',
  templateUrl: './dialog-contact-details.component.html',
  styleUrls: ['./dialog-contact-details.component.scss']
})
export class DialogContactDetailsComponent implements OnInit, OnChanges {
  @Input() contactID: any;
  contact: Contact;
  contactData: any;

  constructor(private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  ngOnChanges() {
    this.loadContact(this.contactID);
  }


  async loadContact(id: any) {
    if (this.contactID) {
      const docRef = doc(this.firestore, "contacts", id);
      const docSnap = await getDoc(docRef);
      this.contactData = docSnap.data();
    }
  }


  openDialogAddTask(name: string, color: any) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.contactName = name;
    dialog.componentInstance.contactBG = color;
  }

}