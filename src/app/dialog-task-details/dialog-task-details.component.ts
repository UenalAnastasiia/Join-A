import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { collection, doc, getDoc, orderBy, query, updateDoc } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/services/snack-bar.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-dialog-task-details',
  templateUrl: './dialog-task-details.component.html',
  styleUrls: ['./dialog-task-details.component.scss']
})
export class DialogTaskDetailsComponent implements OnInit {
  taskID: any;
  taskData: any = [];
  task: Task;
  // choosenPriority: any;
  // clickPriority: boolean = false;
  // selectedCategory: string;
  // selectedContact: any;
  // dueDate: Date;
  // minDate: Date;
  // taskStatus: string;
  // dateChange: boolean = false;
  todayDate: any;
  // contactName: any;
  // loadSpinner: boolean = false;

  // allContacts$: Observable<any>;
  // allContacts: any = [];
  // hideHolder: boolean = false;

  // priorityBtn: any[] = [
  //   { name: 'urgent', icon: 'keyboard_double_arrow_up' },
  //   { name: 'medium', icon: 'clear_all' },
  //   { name: 'low', icon: 'keyboard_double_arrow_down' },
  // ];

  // categoryList: any[] = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];
  // statusList: any[] = ["To do", "In progress", "Awaiting Feedback", "Done"];


  constructor(public dialogRef: MatDialogRef<DialogTaskDetailsComponent>, private firestore: Firestore, public dialog: MatDialog, private messageService: SnackBarService) { }

  
  ngOnInit(): void {
    this.dialogRef.updateSize('35vw', '');
    this.loadTask();
    this.todayDate = new Date().getTime();
  }


  async loadTask() {
    const docRef = doc(this.firestore, "tasks", this.task.id);
    const docSnap = await getDoc(docRef);
    this.taskData = docSnap.data();
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


  openDialogEditTask(id: any) {
    const dialog = this.dialog.open(DialogEditTaskComponent);
    dialog.componentInstance.taskID = id;
  }
}