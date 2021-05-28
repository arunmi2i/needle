import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FlightTypes { 
    list: string[] = [
        "Discovery Flight",
        "Leisure",
        "Maintenance",
        "Proficiency",
        "Training",
        "Time Off",
        "Checkride",
        "Admin"
    ]
}