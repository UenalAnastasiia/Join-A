import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { DialogTaskDetailsComponent } from '../dialog-task-details/dialog-task-details.component';

@Component({
  selector: 'app-dialog-contact-tasks',
  templateUrl: './dialog-contact-tasks.component.html',
  styleUrls: ['./dialog-contact-tasks.component.scss']
})
export class DialogContactTasksComponent implements OnInit {
  taskData: any;
  contactName: string;
  todayDate: any;
  task: Task = new Task();

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogContactTasksComponent>) { }

  ngOnInit(): void {
    this.todayDate = new Date().getTime();
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


  openTaskDetails(id: any) {
    const dialog = this.dialog.open(DialogTaskDetailsComponent);
    dialog.componentInstance.task = new Task(this.task.toJSON());
    dialog.componentInstance.task.id = id;
  }


  openDialogArchivedTask(id: any) {
    const dialog = this.dialog.open(DialogRequestComponent);
    dialog.componentInstance.showArchiveTaskRequest();
    dialog.componentInstance.archivedID = id;
  }

}
