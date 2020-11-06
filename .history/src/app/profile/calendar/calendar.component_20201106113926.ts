import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Calendar, Locations, Schedule } from 'src/app/_services/appointment.model';
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
  public selectedLocation: Locations;
  public selectedDate: string;
  public showSuccess: boolean;
  public showFail: boolean;
  public alertString: string;
  public timeArray: number[] = [];

  public alerts: Array<IAlert> = [];
  public enableButton: boolean;

  private class1Message = 'For car, jeepney, van, pick-up, and motorcycle (400cc and above)';
  private class2Message = 'For bus, and truck';
  private class3Message = 'For large truck, and large truck with trailer';
  public classMessage: string;
  public showClassDesc: boolean;

  public summary = 'Fill in the form to complete the schedule';
  private isSuccessfullySent = false;

  closeResult: string;

  @ViewChild('classic1') classic1: ElementRef;

  form: FormGroup;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [
      // { title: 'event 1', date: '2020-11-01' },
      // { title: 'event 2', date: '2019-04-02' }
    ],
    editable: true
  };

  constructor(
    private as: AppointmentService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.calendars$ = this.as.calendars.subscribe((data: any) => {
      this.calendars = data;
    });
    this.selectedLocation$ = this.as.selectedStation.subscribe((data: any) => {
      this.selectedLocation = data;
      this.spreadStationTime();
      this.setMessage();
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
    const calendarDate = this.datePipe.transform(arg.dateStr, 'yyyy-MM-dd');
    const dateToday = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if (calendarDate < dateToday) {
      return;
    }

    if (this.selectedLocation === undefined || this.selectedLocation === null) {
      alert('No selected location');
      return;
    }
    const x: Calendar = this.calendars.find(x1 => x1.calendarDay === arg.dateStr);
    if (x !== undefined && x.isAvailable ) {
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
        if (!this.isSuccessfullySent) {
          this.preClose();
          this.alerts.push({
            id: 1,
            type: 'warning',
            strong: 'NOTICE',
            message: `You did not submit your application.`,
            icon: ''
          });
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        }
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          alert('PRESSED ESCAPE');
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        alert('DIDN"T CLICK SUBMIT');
          return 'by clicking on a backdrop';
      } else {
          return  'with: $reason';
      }
  }

  createForm(): void {
    this.form = this.fb.group({
      emailAddress: ['rodney.perello@gmail.com', [Validators.required, Validators.email]],
      completeName: ['Rodney Perello', [Validators.required]],
      plateNumber: ['IO0017', [Validators.required]],
      appointmentTime: [null, [Validators.required]],
      vehicleClassId: [2, [Validators.required]]
    });
  }

  submit(formValues: any) {
    this.isSuccessfullySent = false;
    const xForm = formValues.value;
    this.as.queryAvailability(this.selectedDate, this.selectedLocation.Location).subscribe((data: any) => {
      debugger;
      if (data.success) {
        const schedule: Schedule = {
          AppointmentDate: this.selectedDate,
          AppointmentTime: xForm.appointmentTime.toString(),
          CompleteName: xForm.completeName,
          emailAddress: xForm.emailAddress,
          Location: this.selectedLocation.Location,
          PlateNo: xForm.plateNumber,
          VehicleClassId: xForm.vehicleClassId
        };
        this.as.sendSchedule(schedule).subscribe((data1: any) => {
          debugger;
          if (data1.success) {
            this.preClose();
            this.alerts.push({
              id: 1,
              type: 'success',
              strong: 'Ok!',
              message: `${data1.message}. Please remember to keep your reference number.`,
              icon: 'ni ni-like-2'
            });
            this.form.reset();
            this.isSuccessfullySent = true;
            this.modalService.dismissAll();
          } else {
            this.preClose();
            this.alerts.push({
              id: 1,
              type: 'warning',
              strong: 'Notice',
              message: `${data1.message}.`,
              icon: ''
            });
          }
        });
      } else {
        this.preClose();
        this.modalService.dismissAll();
        this.alerts.push({
          id: 1,
          type: 'danger',
          strong: 'Sorry!',
          message: `This date, ${this.selectedDate}, for ${this.selectedLocation.Location} got full already.`,
          icon: ''
        });
      }
    });
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

  onTextChange(xValue: any) {
    const value = xValue.target.value;
    this.showClassDesc = true;
    if (value === '1') {
      this.classMessage = this.class1Message;
      this.enableButton = true;
    } else if (value === '2') {
      this.classMessage = this.class2Message;
      this.enableButton = true;
    } else if (value === '3') {
      this.classMessage = this.class3Message;
      this.enableButton = true;
    } else {
      this.enableButton = false;
      this.classMessage = 'You can only choose between 1 and 3.';
    }
  }

  setMessage() {
    if (this.selectedLocation != null) {
      this.summary = '';
      this.summary += `Installation Site: ${this.selectedLocation.Location} \n`;
    }
  }
}
