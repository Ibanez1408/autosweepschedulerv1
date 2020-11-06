import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locations } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl: string;
  private stationUrl = 'api/Appointment/stations';
  private calendarUrl = 'api/Appointment/calendardays';

  private selectedStation$ = new BehaviorSubject<Locations>(null);
  public selectedStation = this.selectedStation$.asObservable();

  private selectedDate$ = new BehaviorSubject<String>(null);
  public selectedDate = this.selectedDate$.asObservable();


  constructor(
    private http: HttpClient,
  ) { 
    this.baseUrl = environment.baseUrl;
  }

  setSelectedStation(selectedStation: Locations): void {
    this.selectedStation$.next(selectedStation);
  }

  setSelectedDate(selectedDate: String): void {
    this.selectedDate$.next(selectedDate);
  }

  getLocations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${this.stationUrl}`);
  }

  getCalendarAvailability(location: string ): Observable<any> {
    const fd = new FormData();
    fd.append('location', location);
    return this.http.post<any>(`${this.baseUrl}/${this.calendarUrl}/${location}`, fd);
  }

}
