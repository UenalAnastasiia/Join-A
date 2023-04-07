import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Contact } from 'src/models/contact.class';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: Contact = new Contact();
  allContacts$: Observable<any>;
  allContacts: any = [];

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    this.renderContacts();
  }


  renderContacts() {
    const taskCollection = collection(this.firestore, 'contacts');
    this.allContacts$ = collectionData(taskCollection, { idField: "contactID" });

    this.allContacts$.subscribe((loadData: any) => {
      this.allContacts = loadData;
    });
  }

}
