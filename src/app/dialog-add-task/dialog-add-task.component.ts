import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, orderBy, query, setDoc } from 'firebase/firestore';
import { MatInput } from '@angular/material/input';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogAddTaskComponent implements OnInit {
  @ViewChild('dateInput', {
    read: MatInput
  }) dateInput: MatInput;

  choosenPriority: any;
  clickPriority: boolean = false;
  task = new Task();
  selectedCategory: string;
  dueDate: Date;
  minDate: Date;
  taskStatus: string;
  loadSpinner: boolean = false;

  allContacts$: Observable<any>;
  allContacts: any = [];
  selectedContact: any;

  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];
  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];


  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    private firestore: Firestore,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.task.status = this.taskStatus;
    this.loadContacts();
  }


  loadContacts() {
    const contactCollection = collection(this.firestore, 'contacts');
    const queryCollection = query(contactCollection, orderBy("firstName"));
    this.allContacts$ = collectionData(queryCollection, { idField: "contactID" });

    this.allContacts$.subscribe((loadData: any) => {
      this.allContacts = loadData;
    });
  }


  selectOptions() {
    this.task.category = this.selectedCategory;
    this.task.status = this.task.status;
  }

  
  getSelectedContact(selectedContact: any) {  
    this.task.assignedTo = selectedContact.fullName;
    this.task.bgColor = selectedContact.bgColor;
  }


  async saveTask() {
    this.task.dueDate = this.dueDate.getTime();
    const taskCollection = collection(this.firestore, 'tasks');
    const docRef = await addDoc(taskCollection, this.task.toJSON());
    this.task.id = docRef.id;
    await setDoc(doc(this.firestore, 'tasks', docRef.id), this.task.toJSON());
    this.loadSpinner = true;

    setTimeout(() => {
      this.clearForm();
      this.loadSpinner = false;
      const dialog = this.dialog.open(DialogRequestComponent);
      dialog.componentInstance.showAddTaskRequest();
    }, 2000);
  }


  clearForm() {
    this.task.title = '';
    this.task.description = '';
    this.selectedCategory = undefined;
    this.dateInput.value = '';
    this.task.priority = '';
    this.selectedContact = undefined;
    this.task.status = '';
    this.clickPriority = false;
  }

}