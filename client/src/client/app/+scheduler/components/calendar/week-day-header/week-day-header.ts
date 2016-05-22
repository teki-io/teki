import { Input } from '@angular/core';
import { BaseComponent } from '../../../../shared/index';
import { Modal } from 'angular2-modal/plugins/bootstrap/index';
import { ShiftModalWindow, ShiftModalWindowData } from '../shift-modal/index';
import * as moment from 'moment';

@BaseComponent({
  selector: 'week-day-header',
  templateUrl: 'app/+scheduler/components/calendar/week-day-header/week-day-header.html',
  styleUrls: ['app/+scheduler/components/calendar/week-day-header/week-day-header.css'],
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})

export class WeekDayHeader {
  @Input() date: moment.Moment;
  showCreateButton:boolean = false;

  constructor(private modal: Modal) {}

  onMouseEnter() { this.showCreateButton = true; }
  onMouseLeave() { this.showCreateButton = false; }

  promptShift() {
    this.modal.open(ShiftModalWindow, new ShiftModalWindowData(2, 3));
  }
}
