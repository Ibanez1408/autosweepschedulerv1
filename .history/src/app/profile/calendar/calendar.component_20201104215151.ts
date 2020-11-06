import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { Calendar, Locations } from 'src/app/_services/appointment.model';
import { AppointmentService } from 'src/app/_services/appointment.service';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

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
  public showSuccess: boolean;
  public showFail: boolean;
  public alertString: string;

  public alerts: Array<IAlert> = [];

  closeResult: string;

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
    private as: AppointmentService,
    private modalService: NgbModal,
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
      this.showFail = false;
      this.showSuccess = true;
      this.alerts.push({
        id: 1,
        type: 'success',
        strong: 'Success!',
        message: `This date for ${this.selecteLocation.Location} is free.`,
        icon: 'ni ni-like-2'
      });
      open('classic1', 'modal_mini', 'sm')
    } else {
      this.showSuccess = false;
      this.showFail = true;
      this.alerts.push({
        id: 1,
        type: 'danger',
        strong: 'Notice!',
        message: `This date for ${this.selecteLocation.Location} is already full. Please choose another date.`,
        icon: 'ni ni-like-2'
      });
    }
  }

  close(alert: IAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  open(content, type, modalDimension) {
      this.modalService.open(content,{ centered: true }).result.then((result) => {
          this.closeResult = 'Closed with: $result';
      }, (reason) => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  'with: $reason';
      }
  }
}
