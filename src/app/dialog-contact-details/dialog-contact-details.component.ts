import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { Contact } from 'src/models/contact.class';

@Component({
  selector: 'app-dialog-contact-details',
  templateUrl: './dialog-contact-details.component.html',
  styleUrls: ['./dialog-contact-details.component.scss']
})
export class DialogContactDetailsComponent implements OnInit, OnChanges {
  @Input() contactID: any;
  contact: Contact;
  contactData: any;

  constructor(private firestore: Firestore) { }

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
      console.log(this.contactData);
    }
  }

}