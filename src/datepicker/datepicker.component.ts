import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { CalendarComponent } from './calendar.component';
import { Month } from './month.model';
import { Weekday } from './weekday.model';
import { LANG_DE } from './lang-de';

@Component({
  selector: 'md-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatePickerComponent implements OnInit {

  private readonly dialog:MdDialog;
  private dateVal: Date;

  dayNames: Array<Weekday>;
  monthNames: Array<Month>;
  formattedDate: string;
  
  @Output() 
  dateChange = new EventEmitter<Date>();

  @Input() 
  get date(): Date { 
    return this.dateVal; 
  };
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
    this.formattedDate = this.formatDate(val);
  }

  constructor(dialog: MdDialog) {
    this.dialog = dialog;
    this.dayNames = LANG_DE.weekDays;
    this.monthNames = LANG_DE.months;
  }

  ngOnInit() {
    if (this.date === undefined) {
      this.date = new Date();
    }
  }

  openDialog() {
    let ref = this.dialog.open(CalendarComponent);

    // Workaround to update style of dialog which sits outside of the component
    let containerDiv = (<any>ref)._overlayRef._pane.children[0];
    containerDiv.style['padding'] = '0';

    ref.componentInstance.submit.subscribe(result => {
      this.date = result;
      ref.close();
    });
    ref.componentInstance.cancel.subscribe(result => {
      ref.close();
    });
  }

  private formatDate(date:Date): string {
    if (date === undefined) {
      return ;
    }
    let dayOfWeek = this.dayNames[date.getDay()].short;
    let dayOfMonth = date.getDate();
    let month = this.monthNames[date.getMonth()].short;
    let year = date.getFullYear();
    return `${dayOfWeek}, ${dayOfMonth}. ${month} ${year}`;
  }
}
