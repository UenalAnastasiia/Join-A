import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
  optionList = ["Frontend", "Backend", "Design", "Marketing", "Backoffice", "Other"];

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>) {
  }

  ngOnInit(): void {
    this.minDate = new Date();
  }

}
