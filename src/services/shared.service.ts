import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  contactID: any;
  contactData: any;
  archivDialog: boolean = false;
  allTasks$: Observable<any>;
  taskLength: number;
  contactTasks: any;

  constructor(private firestore: Firestore) {
  }


  async loadContact(id: any) {
    if (id) {
      const docRef = doc(this.firestore, "contacts", id);
      const docSnap = await getDoc(docRef);
      this.contactData = docSnap.data();
      this.renderTasks();
    }
  }


  renderTasks() {
    const contactCollection = collection(this.firestore, 'tasks');
    const queryCollection = query(contactCollection, orderBy("dueDate"));
    this.allTasks$ = collectionData(queryCollection, { idField: "taskID" });

    this.allTasks$.subscribe((loadData: any) => {
      if (this.contactData) {
        let filterDate = loadData.filter(data => data.assignedTo === this.contactData.fullName && data.status != 'archived');
        this.taskLength = filterDate.length;
        this.contactTasks = filterDate;
      }
    });
  }
}