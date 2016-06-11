import { Input } from '@angular/core';
import { BaseComponent } from '../../../../shared/index';
import { IDay } from '../../../interfaces/index';
import { DailyShifts } from '../daily-shifts/index';
import { WeekDayHeader } from '../week-day-header/index';

@BaseComponent({
  selector: 'week-day',
  templateUrl: 'app/+schedule/components/calendar/week-day/week-day.html',
  styleUrls: ['app/+schedule/components/calendar/week-day/week-day.css'],
  directives: [DailyShifts, WeekDayHeader]
})

export class WeekDay {
  @Input() day:    IDay;
  @Input() showAll: boolean = false;
}
