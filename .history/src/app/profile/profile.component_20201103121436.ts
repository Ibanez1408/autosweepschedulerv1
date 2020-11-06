import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    model1 : NgbDate;

    constructor() { }

    ngOnInit() {}

    onDateSelection(event: any) {
        console.log(event)
    }

}
