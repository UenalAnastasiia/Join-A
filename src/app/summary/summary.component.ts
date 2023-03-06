import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss', './clock.scss']
})
export class SummaryComponent implements OnInit {
  greeting: string;

  constructor() {
 }

  ngOnInit(): void {
    this.getTime();
    this.decide();
  }


  getTime() {
    setInterval(() => {
      const deg = 6;
      let day = new Date();
      let hh = day.getHours() * 30;
      let mm = day.getMinutes() * deg;
      let ss = day.getSeconds() * deg;

      (document.querySelector('#hr') as HTMLElement).style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
      (document.querySelector('#mn') as HTMLElement).style.transform = `rotateZ(${mm}deg)`;
      (document.querySelector('#sc') as HTMLElement).style.transform = `rotateZ(${ss}deg)`;
    });
  }


  decide() {
    let hours = new Date().getHours();

    if (hours < 10) {
      this.greeting = "Good Morning";
    } else if (hours < 16) {
      this.greeting = "Good Afternoon";
    } else if (hours < 19) {
      this.greeting = "Good Evening";
    } else if (hours < 24) {
      this.greeting = "Good Night";
    } else if (hours < 6) {
      this.greeting = "Hello";
    }
  }

}