import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Task } from 'src/models/task.class';

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

  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];

  constructor(public dialogRef: MatDialogRef<DialogTaskDetailsComponent>, private firestore: Firestore) { }

  ngOnInit(): void {
    this.loadTask();
  }


  async loadTask() {
    const docRef = doc(this.firestore, "tasks", this.task.id);
    const docSnap = await getDoc(docRef);
    this.taskData = docSnap.data();
    console.log(this.taskData);
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


  selectCategory() {
    this.task.category = this.selectedCategory;
  }


  async saveTask() {
    this.task.dueDate = this.dueDate.getTime();
    this.task.status = this.taskStatus;
    
    const taskCollection = collection(this.firestore, 'tasks');
    const docRef = await addDoc(taskCollection, this.task.toJSON());
    this.task.id = docRef.id;
    await setDoc(doc(this.firestore, 'tasks', docRef.id), this.task.toJSON());
    this.dialogRef.close();
  }

}
