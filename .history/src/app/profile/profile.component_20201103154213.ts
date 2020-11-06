import { Component, OnInit } from '@angular/core';
import { StationsService } from '../_services/stations.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Station } from '../_services/stations.model';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../_services/appointment.model';
import { SheetsService } from '../_services/sheets.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    model1: NgbDate;

    public stations: Station[];
    private appointment: Appointment


    constructor(
        private ss: StationsService,
        private sheetsService: SheetsService
    ) {
        this.stations = this.ss.stations;
     }

    ngOnInit() {
this.sendToSheet();
    }

    sendToSheet() {
        debugger;
        this.sheetsService.sendToSheet().subscribe((data: any) => {
            console.log(data);
        });
    }

    onDateSelection(event: any) {
        debugger;
        console.log(event);
    }

}
