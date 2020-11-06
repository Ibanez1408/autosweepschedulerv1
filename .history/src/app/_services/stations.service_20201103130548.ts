import { Injectable } from '@angular/core';
import { Station } from './stations.model';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  public stations: Station[];

  constructor() {
    this.stations = [
      {'channel': 'Customer Service Center', 'location': 'C5 CSC Southbound'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron Dasmarinas'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Shell Magallanes'},
      {'channel': 'Toll Gate [ATG]', 'location': 'C5 Toll NB'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Bicutan Drive Thru'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Nichols Drive Thru'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Runway NB Toll Plaza'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Sucat SB Exit'},
      {'channel': 'Toll Gate [ATG]', 'location': 'OLD NAIAX - Drive Thru'},
      {'channel': 'Toll Gate [ATG]', 'location': 'NAIAX Alpha'},
      {'channel': 'Toll Gate [ATG]', 'location': 'NAIAX Bravo'},
      {'channel': 'Customer Service Center', 'location': 'Southwoods NB'},
      {'channel': 'Customer Service Center', 'location': 'Calamba CSC'},
      {'channel': 'Customer Service Center', 'location': 'Ayala Greenfield'},
      {'channel': 'Customer Service Center', 'location': 'Silangan CSC'},
      {'channel': 'Customer Service Center', 'location': 'Sta Rosa SB'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Shell Mamplasan'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron San Pedro'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Shell Putatan'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron KM 44 SB'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Caltex MCX'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Total NB'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Caltex SB'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Eton NB Drive Thru'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Southwoods NB Drive Thru'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Sta Rosa SB Drive Thru'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Cabuyao NB Drive Thru'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Filinvest'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Mamplasan NB'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Mamplasan SB'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Alabang SB Drive Thru'},
      {'channel': 'Toll Gate [Kiosk]', 'location': 'Susana Heights'},
      {'channel': 'Toll Gate [Kiosk]', 'location': 'Cabuyao SB'},
      {'channel': 'Customer Service Center', 'location': 'Star Toll Lipa CSC'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron Lipa'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron Malvar'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron Ibaan'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Batangas'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Sto Tomas'},
      {'channel': 'Toll Gate [ATG]', 'location': 'Lipa SB'},
      {'channel': 'Customer Service Center', 'location': 'Tarlac CSC'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron Pura NB'},
      {'channel': 'Gas Station [Kiosk]', 'location': 'Petron Pura SB'},
      {'channel': 'Toll Gate [ATG]', 'location': 'ATG Carmen'},
      {'channel': 'Toll Gate [ATG]', 'location': 'ATG Pura'},
      {'channel': 'Toll Gate [ATG]', 'location': 'ATG Rosario'},
      {'channel': 'Toll Gate [ATG]', 'location': 'ATG Tarlac'},
      {'channel': 'Toll Gate [ATG]', 'location': 'ATG Urdaneta'},
      {'channel': 'Toll Gate [ATG]', 'location': 'ATG Victoria'},
      {'channel': 'Village Set-up', 'location': 'Ayala Heights Village'},
      {'channel': 'Mall Set-up', 'location': 'Southwoods Mall Transport Hub'},
      {'channel': 'Mall Set-up', 'location': 'Sta Rosa Integrated Terminal'}
    ];
  }
}
