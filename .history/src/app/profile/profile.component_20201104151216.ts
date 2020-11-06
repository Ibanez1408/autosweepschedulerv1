import { Component, OnInit } from '@angular/core';
import { StationsService } from '../_services/stations.service';
import { ModalDismissReasons, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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



    closeResult: string;

    constructor(
        private ss: StationsService,
        private sheetsService: SheetsService,
        private modalService: NgbModal
    ) {
        this.stations = this.ss.stations;
     }

    ngOnInit() {
        this.sendToSheet();
    }

    sendToSheet() {
        this.sheetsService.sendToSheet().subscribe((data: any) => {
            console.log(data);
        },
        (err) => {
            console.log(err.message);
        });
    }

    onDateSelection(event: any) {
        console.log(event);
    }

    open(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        } else if (modalDimension === '' && type === 'Notification') {
          this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
              this.closeResult = 'Closed with: $result';
          }, (reason) => {
              this.closeResult = 'Dismissed $this.getDismissReason(reason)';
          });
        } else {
            this.modalService.open(content,{ centered: true }).result.then((result) => {
                this.closeResult = 'Closed with: $result';
            }, (reason) => {
                this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        }
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

}
