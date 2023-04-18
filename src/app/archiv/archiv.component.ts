import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore, collection, query, where } from '@angular/fire/firestore';
import { Task } from 'src/models/task.class';
import { Observable } from 'rxjs';
import { DialogTaskDetailsComponent } from '../dialog-task-details/dialog-task-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-archiv',
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.scss']
})
export class ArchivComponent implements OnInit {
  task: Task = new Task();
  archivedTasks$: Observable<any>;
  archivedTasks: any = [];
  todayDate: any;
  searchInput: string;

  constructor(private firestore: Firestore, public dialog: MatDialog, public shared: SharedService) { }

  ngOnInit(): void {
    const queryCollection = query(collection(this.firestore, "tasks"), where("status", "==", "archived"));
    this.archivedTasks$ = collectionData(queryCollection, { idField: "taskID" });
    this.archivedTasks$.subscribe((data: any) => {
      this.archivedTasks = data;
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


  openTaskDetails(id: any) {
    const dialog = this.dialog.open(DialogTaskDetailsComponent);
    dialog.componentInstance.task = new Task(this.task.toJSON());
    dialog.componentInstance.task.id = id;
    this.shared.archivDialog = true;
  }


  openDialogDeleteTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showADeleteTaskRequest();
    dialog.componentInstance.deleteTaskID = id;
  }


}