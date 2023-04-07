import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { collection, doc, getDoc, orderBy, query, updateDoc } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-task-details',
  templateUrl: './dialog-task-details.component.html',
  styleUrls: ['./dialog-task-details.component.scss']
})
export class DialogTaskDetailsComponent implements OnInit {
  taskID: any;
  taskData: any = [];
  choosenPriority: any;
  clickPriority: boolean = false;
  task: Task;
  selectedCategory: string;
  dueDate: Date;
  minDate: Date;
  taskStatus: string;
  dateChange: boolean = false;
  todayDate: any;

  allContacts$: Observable<any>;
  allContacts: any = [];

  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];
  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];


  constructor(public dialogRef: MatDialogRef<DialogTaskDetailsComponent>, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTask();
    this.loadContacts();
    this.minDate = new Date();
    this.todayDate = new Date().getTime();
  }


  async loadTask() {
    const docRef = doc(this.firestore, "tasks", this.task.id);
    const docSnap = await getDoc(docRef);
    this.taskData = docSnap.data();
  }


  loadContacts() {
    const contactCollection = collection(this.firestore, 'contacts');
    const queryCollection = query(contactCollection, orderBy("firstName"));
    this.allContacts$ = collectionData(queryCollection, { idField: "contactID" });

    this.allContacts$.subscribe((loadData: any) => {
      this.allContacts = loadData;
    });
  }


  getCategoryColor(priority: string) {
    switch (priority) {
      case 'Frontend': return 'rgb(115 26 203)';
      case 'Backend': return 'rgb(69 139 127)';
      case 'Design': return '#FF7A00';
      case 'Marketing': return '#0038FF';
      case 'Backoffice': return '#1FD7C1';
      case 'Other': return '#FC71FF';
      default: return '';
    }
  }


  selectOptions() {
    this.task.category = this.selectedCategory;
    this.task.status = this.task.status;
  }


  async saveTask() {
    if (this.dateChange === true) {
      this.taskData.dueDate = this.taskData.dueDate.getTime();
    }

    await updateDoc(doc(this.firestore, "tasks", this.taskData.id),
      { title: this.taskData.title,
        description: this.taskData.description,
        category: this.taskData.category,
        dueDate: this.taskData.dueDate,
        priority: this.taskData.priority,
        assignedTo: this.taskData.assignedTo,
        status: this.taskData.status });
    this.dialogRef.close();
  }


  openDialogArchivedTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showArchiveTaskRequest();
    dialog.componentInstance.archivedID = id;
  }

}