import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() condition: any = "";

  @Input() isOnSubmit: boolean = false;

  @Input() label: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
