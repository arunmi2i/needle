import { Component, OnInit } from '@angular/core';
import { CustomResponse } from 'src/app/shared/constants/custom-response.model';
import { EventList } from 'src/app/shared/constants/event-list.model';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventList: EventList[] = [];

  isListVisible: boolean = false;

  isItemView: boolean = false;

  constructor(private eventService:EventService) { }

  ngOnInit(): void {
    this.isListVisible = true;
    this.isItemView = false;
    this.getEvents();
  }

  getEvents() {
    this.eventService.getActiveEvents((response: CustomResponse) => {
      this.isListVisible = true;
      if (response.type == "success") {
        this.eventList = response.data;
      }
    })
  }

  onEventItemClick(selectedItem:EventList) {
    console.log("clicked...",selectedItem);
    this.isListVisible = false;
    this.isItemView = true;
  }
}
