import { Input } from '@angular/core';
import { BaseComponent } from '../../../../shared/index';
import * as moment from 'moment';

@BaseComponent({
  selector: 'week-day-header',
  templateUrl: 'app/+schedule/components/calendar/week-day-header/week-day-header.html',
  styleUrls: ['app/+schedule/components/calendar/week-day-header/week-day-header.css']
})

export class WeekDayHeader {
  @Input() date: moment.Moment;
}
