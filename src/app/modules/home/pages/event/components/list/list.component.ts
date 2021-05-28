import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventList } from 'src/app/shared/constants/event-list.model';
import { TabMenu } from 'src/app/shared/constants/ui-kits.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() dataList: EventList[] = [];

  @Output() itemClick: EventEmitter<EventList> = new EventEmitter();


  eventTabs: TabMenu[] = [
    {
      label: "UPCOMING",
      command: (event?: any)=>{
        console.log("clicked");
      }
    },
    {
      label: "GOING",
      command: (event?: any)=>{
        console.log("clicked");
      }
    },
    {
      label: "EXPIRED",
      command: (event?: any)=>{
        console.log("clicked");
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item: EventList) {
    this.itemClick.emit(item);
  }

}
