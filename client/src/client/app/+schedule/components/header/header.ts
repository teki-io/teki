import {BaseComponent}  from '../../../shared/core/index';
import {Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';

@BaseComponent({
  selector: 'header',
  templateUrl: 'app/+schedule/components/header/header.html'
})

export class Header {
  @Input()  currentDate: moment.Moment;
  @Input()  calendarMode: Number;
  @Output() dateChanged:EventEmitter<any> = new EventEmitter();
  @Output() modeChanged:EventEmitter<any> = new EventEmitter();

  toggleMode(mode: Number) {
    this.calendarMode = mode;
    this.modeChanged.emit(this.calendarMode);
  }

  next() {
    switch (this.calendarMode) {
      case 1:
        this.currentDate.add(1, 'days');
        break;
      case 2:
        this.currentDate = this.currentDate.clone().startOf('week').add(7, 'days');
        break;
      case 3:
        this.currentDate = this.currentDate.clone().startOf('month').add(1, 'months');
        break;
      default:
        this.currentDate = this.currentDate.clone().startOf('month').add(1, 'months');
        break;
    }
    this.dateChanged.emit(this.currentDate);
  }

  back() {
    switch (this.calendarMode) {
      case 1:
        this.currentDate.subtract(1, 'days');
        break;
      case 2:
        this.currentDate = this.currentDate.clone().startOf('week').subtract(7, 'days');
        break;
      case 3:
        this.currentDate = this.currentDate.clone().startOf('month').subtract(1, 'months');
        break;
      default:
        this.currentDate = this.currentDate.clone().startOf('month').subtract(1, 'months');
        break;
    }
    this.dateChanged.emit(this.currentDate);
  }

  selectToday() {
    this.currentDate = moment();
    this.dateChanged.emit(this.currentDate);
  }
}
