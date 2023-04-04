import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore, collection, query, where } from '@angular/fire/firestore';
import { Task } from 'src/models/task.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archiv',
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.scss']
})
export class ArchivComponent implements OnInit {
  task: Task = new Task();
  archivedTasks$: Observable<any>;
  archivedTasks: any = [];

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    const queryCollection = query(collection(this.firestore, "tasks"), where("status", "==", "archived"));
    this.archivedTasks$ = collectionData(queryCollection, { idField: "taskID" });
    this.archivedTasks$.subscribe((data: any) => {
      this.archivedTasks = data;
    });
  }


}