import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { collectionData, doc, Firestore, collection, query, updateDoc, where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.class';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
  task = new Task();
  allTasks$: Observable<any>;
  allTasks: any = [];
  taskID: string;

  todoTask: any;
  inprogressTask: any = [];
  awaitingfeedbackTask: any = [];
  doneTask: any = [];

  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];
  

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const taskCollection = collection(this.firestore, 'tasks');
    this.allTasks$ = collectionData(taskCollection, { idField: "taskID" });

    this.allTasks$.subscribe((loadData: any) => {
      this.allTasks = loadData;
    });

    for (let index = 0; index < this.statusList.length; index++) {
      this.filterTasks(this.statusList[index]);
    }
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


  filterTasks(name: string) {
    const queryCollection = query(collection(this.firestore, "tasks"), where("status", "==", name));
    this.allTasks$ = collectionData(queryCollection, { idField: "taskID" });
    this.allTasks$.subscribe((data: any) => {
      if (name === "To do") {
        this.todoTask = data;
      } else if (name === "In progress") {
        this.inprogressTask = data;
      } else if (name === "Awaiting Feedback") {
        this.awaitingfeedbackTask = data;
      } else if (name === "Done") {
        this.doneTask = data;
      }
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.updateTaskStatus(event.container.data[event.currentIndex]['id'], event.container.id);
    }
  }


  async updateTaskStatus(taskID: any, stat: string) {
    await updateDoc(doc(this.firestore, "tasks", taskID),
          { status: stat });
  }


  openDialogAddTask(status: string) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.taskStatus = status;
  }
}