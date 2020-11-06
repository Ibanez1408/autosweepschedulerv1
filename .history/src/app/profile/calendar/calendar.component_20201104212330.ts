import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
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
  private selecteLocation: Locations;
  private showSuccess: boolean;
  private showFail: boolean;


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
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
    });
    this.selectedLocation$ = this.as.selectedStation.subscribe((data: any) => {
      this.selecteLocation = data;
    });
  }
  ngOnDestroy(): void {
    this.calendars$.unsubscribe();
    this.selectedLocation$.unsubscribe();
  }

  ngOnInit(): void {
  }

  handleDateClick(arg) {
    if (this.selecteLocation === undefined || this.selecteLocation === null) {
      alert('No selected location');
      return;
    }
    const x: Calendar = this.calendars.find(x1 => x1.calendarDay === arg.dateStr);
    if (x !== undefined && x.isAvailable ) {
      alert(`This date for ${this.selecteLocation.Location} is free.`);
    } else {
      alert(`This date for ${this.selecteLocation.Location} is already full. Please choose another date.`);
    }
  }

}
