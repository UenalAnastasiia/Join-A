import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.class';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
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
  // statusList: any[] = [
  //   {
  //     name: "To do",
  //     taskArray: "this.todoTask"
  //   },
  //   {
  //     name: "In progress",
  //     taskArray: "this.inprogressTask"
  //   },
  //   {
  //     name: "Awaiting Feedback",
  //     taskArray: "this.awaitingfeedbackTask"
  //   },
  //   {
  //     name: "Done",
  //     taskArray: "this.doneTask"
  //   },
  // ];

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


  drop(event: CdkDragDrop<string[]>, tt) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        // console.log(event.previousIndex);
        
        this.updateTaskStatus(event.container.data[event.currentIndex]['id']);
    }
  }


  updateTaskStatus(id: any) {
    
  }


  openDialogAddTask(status: string) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.taskStatus = status;
  }
}