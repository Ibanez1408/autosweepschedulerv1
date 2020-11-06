export class Appointment {
    emailAddress: String;
    customerName: String;
    plateNumber: String;
    date: String;
    time: String;
}

export class Locations {
    ID: number;
    Tollway: string;
    Channel: string;
    Location: string;
    Allocation: number;
    OpeningHour: number;
    ClosingHour: string;
    OpenHourInt: number;
    CloseHourInt:  number;
}

export class Calendar {
    calendarDay: string;
    isAvailable: boolean;
}

export class Schedule {
    emailAddres: string;
    completeName: string;
    plateNo: string;
    location: string;
    appointmentTime: string;
    appointmentDate: string;
    vehicleClassId: string;
}

export class Query {
    CalendarDate: string;
    Location: string;
}