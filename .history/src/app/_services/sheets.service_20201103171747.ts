import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(
    private http: HttpClient,
  ) { }

  sendToSheet(): Observable<any> {
    const form = document.forms['submit-to-google-sheet']
    const appointment: Appointment = {
        customerName: 'Juan Dela Cruz',
        day: '2020-01-01',
        emailAddress: 'juan@juan.com',
        plateNumber: 'AAA1111',
        time: '11:59:00'
    };
    const app = JSON.stringify(appointment)
    return this.http.post(
      'https://script.google.com/macros/s/AKfycbzlX2uu_ODBFDf9GN-7MuYS7CCMAl_50K_8l2rdhgcPx7e4vaLC/exec',
      app
    );
}
}
