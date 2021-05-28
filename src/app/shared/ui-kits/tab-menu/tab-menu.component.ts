import { Component, Input, OnInit } from '@angular/core';
import { TabMenu } from '../../constants/ui-kits.model';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {

  @Input() tabMenuItems: TabMenu[] = []; 

  constructor() { }

  ngOnInit(): void {
  }
}
