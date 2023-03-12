import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DialogAddTaskComponent implements OnInit {
  choosenCategory: any;
  categoryBtn: any[] = [
    { name: 'urgent', icon: 'keyboard_double_arrow_up' },
    { name: 'medium', icon: 'clear_all' },
    { name: 'low', icon: 'keyboard_double_arrow_down' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
