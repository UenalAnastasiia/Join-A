import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss', './clock.scss']
})
export class SummaryComponent implements OnInit {
  time;
  hours;
  greeting;

  constructor() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.decide();
  }

  ngOnInit(): void {
  }


  decide() {
    this.hours = new Date().getHours();

    if (this.hours < 10) {
      this.greeting = "Good Morning";
    } else if (this.hours < 16) {
      this.greeting = "Good Afternoon";
    } else if (this.hours < 19) {
      this.greeting = "Good Evening";
    } else if (this.hours < 24) {
      this.greeting = "Good Night";
    } else if (this.hours < 6) {
      this.greeting = "Hello";
    }
  }

}