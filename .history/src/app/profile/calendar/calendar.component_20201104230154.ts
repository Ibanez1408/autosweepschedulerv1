import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private selectedLocation: Locations;
  private selectedDate: string;
  public showSuccess: boolean;
  public showFail: boolean;
  public alertString: string;
  public timeArray: number[] = [];

  public alerts: Array<IAlert> = [];

  closeResult: string;

  @ViewChild('classic1') classic1: ElementRef;

  form: FormGroup;

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
    private fb: FormBuilder,
  ) {
    this.calendars$ = this.as.calendars.subscribe((data: any) => {
      this.calendars = data;
    });
    this.selectedLocation$ = this.as.selectedStation.subscribe((data: any) => {
      this.selectedLocation = data;
      this.spreadStationTime();
    });
  }
  ngOnDestroy(): void {
    this.calendars$.unsubscribe();
    this.selectedLocation$.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
  }

  handleDateClick(arg) {
    if (this.selectedLocation === undefined || this.selectedLocation === null) {
      alert('No selected location');
      return;
    }
    const x: Calendar = this.calendars.find(x1 => x1.calendarDay === arg.dateStr);
    if (x !== undefined && x.isAvailable ) {
      this.showFail = false;
      this.showSuccess = true;
      this.preClose();
      this.alerts.push({
        id: 1,
        type: 'success',
        strong: 'Ok!',
        message: `This date, ${arg.dateStr}, for ${this.selectedLocation.Location} is free.`,
        icon: 'ni ni-like-2'
      });
      this.selectedDate = arg.dateStr;
       this.open(this.classic1, 'modal_mini', 'sm');
    } else {
      this.showSuccess = false;
      this.showFail = true;
      this.preClose();
      this.alerts.push({
        id: 1,
        type: 'danger',
        strong: 'Sorry!',
        message: `This date, ${arg.dateStr}, for ${this.selectedLocation.Location} is already full.`,
        icon: ''
      });
    }
  }

  preClose() {
    if (this.alerts.length > 0) {
      const iAlert: IAlert = {
        id: this.alerts[0].id,
        message: this.alerts[0].message,
        type: this.alerts[0].type,
        icon: this.alerts[0].icon,
        strong: this.alerts[0].strong
      };
      this.close(iAlert);
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

  createForm(): void {
    this.form = this.fb.group({
      emailAddress: [null, [Validators.required, Validators.email]],
      completeName: [null, [Validators.required]],
      plateNumber: [null, [Validators.required]],
      appointmentTime: [null, [Validators.required]],
      vehicleClassId: [null, [Validators.required]]
    });
  }

  submit(formValues: any) {
    console.log(formValues.value);
    this.as.queryAvailability(this.)
  }

  spreadStationTime() {
    if (this.selectedLocation === null || this.selectedLocation === undefined) {
      return;
    }

    let start = this.selectedLocation.OpenHourInt;
    const end = this.selectedLocation.CloseHourInt;
    this.timeArray.push(start);
    while (start < end) {
      start++;
      this.timeArray.push(start);
    }
  }
}
