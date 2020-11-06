import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private url: string;

  private selectedStation$ = new BehaviorSubject<String>(null);
  public selectedStation = this.selectedStation$.asObservable();

  private selectedDate$ = new BehaviorSubject<String>(null);
  public selectedDate = this.selectedDate$.asObservable();

  constructor(
    private http: HttpClient,
  ) { 
    this.url = '';
  }

  setSelectedStation(selectedStation: String): void {
    this.selectedStation$.next(selectedStation);
  }

  setSelectedDate(selectedDate: String): void {
    this.selectedDate$.next(selectedDate);
  }

  sendAppointment(appointment: String): Observable<any> {
    return this.http.post<any>(this.url, appointment);
  }

}
