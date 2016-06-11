import { Input } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import { BaseComponent, Model } from '../../../../shared/index';
import { IDay } from '../../../interfaces/index';
import { ShiftComponent } from '../shift/index';

@BaseComponent({
  selector: 'daily-shifts',
  templateUrl: 'app/+schedule/components/calendar/daily-shifts/daily-shifts.html',
  styleUrls: ['app/+schedule/components/calendar/daily-shifts/daily-shifts.css'],
  directives: [COMMON_DIRECTIVES, ShiftComponent]
})

export class DailyShifts {
  @Input() day: IDay;
  shifts: Model.Shift[] = [];

  ngOnInit() {
    this.shifts = this.day.shifts;
  }
}
