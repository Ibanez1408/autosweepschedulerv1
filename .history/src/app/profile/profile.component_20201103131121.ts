import { Component, OnInit } from '@angular/core';
import { StationsService } from '../_services/stations.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Station } from '../_services/stations.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    model1: NgbDate;

    public stations: Station[];

    
    constructor(
        private ss: StationsService
    ) {
        this.stations = this.ss.stations;
     }

    ngOnInit() {}

    onDateSelection(event: any) {
        console.log(event);
    }

}
