import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogAddTaskComponent implements OnInit {
  choosenPriority: any;
  clickPriority: boolean = false;
  task = new Task();
  selectedCategory: string;
  dueDate: Date;
  minDate: Date;

  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];


  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>, private firestore: Firestore) {
  }

  ngOnInit(): void {
    this.minDate = new Date();
  }


  selectCategory() {
    this.task.category = this.selectedCategory;
  }


  async saveTask(status: string) {
    this.task.dueDate = this.dueDate.getTime();
    this.task.status = status;
    const taskCollection = collection(this.firestore, status);
    // console.log('Show task: ', this.task.toJSON());
    
    const docRef = await addDoc(taskCollection, this.task.toJSON());
    this.task.id = docRef.id;

    await setDoc(doc(this.firestore, status, docRef.id), this.task.toJSON());
    this.dialogRef.close();
  }

}