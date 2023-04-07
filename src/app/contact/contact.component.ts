import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
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
  currentAlphabet: any;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    this.renderContacts();
  }


  renderContacts() {
    const contactCollection = collection(this.firestore, 'contacts');
    const queryCollection = query(contactCollection, orderBy("firstName"));
    this.allContacts$ = collectionData(queryCollection, { idField: "contactID" });

    this.allContacts$.subscribe((loadData: any) => {
      this.allContacts = loadData;
    });
  }


  checkLetter(name: string) {
    if (this.currentAlphabet === name.charAt(0).toLowerCase()) {
      return false;
    } else {
      this.currentAlphabet = name.charAt(0).toLowerCase();
      return true;
    }
  }
}