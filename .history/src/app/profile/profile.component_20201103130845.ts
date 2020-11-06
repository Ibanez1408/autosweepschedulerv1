import { Component, OnInit } from '@angular/core';
import { StationsService } from '../_services/stations.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    model1: NgbDate;

    private stations: Station;

    sites: string[] = ['Site A', 'Site B', 'Site C'];

    constructor(
        private ss: StationsService
    ) { }

    ngOnInit() {}

    onDateSelection(event: any) {
        console.log(event);
    }

}
