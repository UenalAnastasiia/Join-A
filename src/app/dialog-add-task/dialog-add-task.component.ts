import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogAddTaskComponent implements OnInit {
  choosenPriority: any;
  clickPriority: boolean = false;
  priorityBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];
  minDate: Date;
  categoryList = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];
  task = new Task();
  dueDate: Date;
  selectedCategory: string;
  // selectedCategory: string = 'Frontend';

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>, private firestore: Firestore) {
  }

  ngOnInit(): void {
    this.minDate = new Date();
  }


  selectOption() {
    this.task.category = this.selectedCategory;
    console.log(this.selectedCategory)
  }


  async saveTask(status: string) {
    this.task.dueDate = this.dueDate.getTime();
    const taskCollection = collection(this.firestore, status);
    console.log('Show task: ', this.task.toJSON());
    console.log('Status: ', status);
    
    // await addDoc(taskCollection, this.task.toJSON());
    // this.task.id = taskCollection.id;
  }

}
