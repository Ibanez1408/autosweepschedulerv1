import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  fullDates: string[] = ['2020-11-01', '2020-11-29'];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-11-01' },
      { title: 'event 2', date: '2019-04-02' }
    ],
    editable: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  handleDateClick(arg) {
    if (arg.dateStr === '2020-11-01') {
      alert('Date is already full.');
    } else {
      alert('date click! ' + arg.dateStr);
    }
  }

}
