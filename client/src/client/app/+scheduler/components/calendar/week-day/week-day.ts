import { Input } from '@angular/core';
import {
  BaseComponent,
  ShiftTemplate,
  Employee
} from '../../../../shared/index';
import { IDay } from '../../../interfaces/index';
import { DailyShifts } from '../daily-shifts/index';
import { WeekDayHeader } from '../week-day-header/index';

@BaseComponent({
  selector: 'week-day',
  templateUrl: 'app/+scheduler/components/calendar/week-day/week-day.html',
  styleUrls: ['app/+scheduler/components/calendar/week-day/week-day.css'],
  directives: [DailyShifts, WeekDayHeader]
})

export class WeekDay {
  @Input() day:    IDay;
  @Input() shiftTemplates: Array<ShiftTemplate>;
  @Input() employees: Array<Employee>;
  @Input() showAll:boolean = false;
}
