import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { Contact } from 'src/models/contact.class';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { DialogEditContactComponent } from '../dialog-edit-contact/dialog-edit-contact.component';
import { Observable } from 'rxjs';
import { SharedService } from 'src/services/shared.service';
import { DialogContactTasksComponent } from '../dialog-contact-tasks/dialog-contact-tasks.component';


@Component({
  selector: 'app-dialog-contact-details',
  templateUrl: './dialog-contact-details.component.html',
  styleUrls: ['./dialog-contact-details.component.scss']
})
export class DialogContactDetailsComponent implements OnInit, OnChanges {
  @Input() contactID: any;
  contact: Contact;
  contactData: any;
  allTasks$: Observable<any>;
  taskLength: number;
  contactTasks: any;

  constructor(private firestore: Firestore, public dialog: MatDialog, public shared: SharedService) { }

  ngOnInit(): void {
  }


  ngOnChanges() {
    setInterval(() => {
      this.loadContact(this.shared.contactID); 
    }, 100);
  }


  async loadContact(id: any) {
    if (this.contactID) {
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
        let filterDate = loadData.filter(data => data.assignedTo == this.contactData.fullName && data.status != 'archived');
        this.taskLength = filterDate.length;
        this.contactTasks = filterDate;        
      }
    });
  }


  openDialogAddTask(name: string, color: any) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.contactName = name;
    dialog.componentInstance.contactBG = color;
  }


  openDialogEditContact(id: any) {
    const dialog = this.dialog.open(DialogEditContactComponent);
    dialog.componentInstance.contactID = id;
  }


  openDialogContactTasks(tasks: any, name: string) {
    const dialog = this.dialog.open(DialogContactTasksComponent);
    dialog.componentInstance.taskData = tasks;
    dialog.componentInstance.contactName = name;
  }
}