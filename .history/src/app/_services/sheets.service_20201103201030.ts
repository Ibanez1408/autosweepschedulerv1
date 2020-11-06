import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const myParams = new URLSearchParams();
    
    const appointment: Appointment = {
      emailAddress: 'juan@juan.com',
      customerName: 'Juan Dela Cruz',
      plateNumber: 'AAA1111',
      date: '2020-01-01',
      time: '11:59:00'
    };
    myParams.append('id', JSON.stringify(appointment));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        }),
      };

    // const options = new RequestOptions({ headers: myHeaders, params: myParams });
  //   const options = new RequestOptions({
  //     // Have to make a URLSearchParams with a query string
  //     search: new URLSearchParams('validateUsr=false') // <-----
  // });
    return this.http.post(
      'https://script.google.com/macros/s/AKfycbzxzBbAmnoLwHEy9xMg7h0ryFYN5_OJTMC6m8Qbm45okHFikAs/exec', myParams, httpOptions);
}
}
