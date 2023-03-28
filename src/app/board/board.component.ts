import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from 'firebase/firestore';
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

  statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const taskCollection = collection(this.firestore, 'tasks');
    this.allTasks$ = collectionData(taskCollection, { idField: "taskID" });

    this.allTasks$.subscribe((loadData: any) => {
      this.allTasks = loadData;
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


  openDialogAddTask(status: string) {
    const dialog = this.dialog.open(DialogAddTaskComponent);
    dialog.componentInstance.taskStatus = status;
  }

}