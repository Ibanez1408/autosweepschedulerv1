import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Observable, Subscription } from 'rxjs';
import { Calendar, Locations } from 'src/app/_services/appointment.model';
import { AppointmentService } from 'src/app/_services/appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  private calendars$: Subscription;
  private selectedLocation$: Subscription;
  private calendars: Calendar[];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-11-01' },
      { title: 'event 2', date: '2019-04-02' }
    ],
    editable: true
  };

  constructor(
    private as: AppointmentService
  ) {
    this.calendars$ = this.as.calendars.subscribe((data: any) => {
      this.calendars = data;
      console.log(this.calendars);
    });
  }
  ngOnDestroy(): void {
    this.calendars$.unsubscribe();
    this.selectedLocation$.unsubscribe();
  }

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
