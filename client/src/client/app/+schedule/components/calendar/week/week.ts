import { Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { BaseComponent, Model } from '../../../../shared/index';
import { IWeek } from '../../../interfaces/index';
import { WeekDay } from '../week-day/index';
import { WeekHelper } from './services/index';

@BaseComponent({
  selector: 'week',
  templateUrl: 'app/+schedule/components/calendar/week/week.html',
  styleUrls: ['app/+schedule/components/calendar/week/week.css'],
  directives: [WeekDay],
  providers: [WeekHelper]
})

export class Week implements OnChanges {
  @Input() week:    IWeek;
  @Input() shifts:  Array<Model.Shift>;
  @Input() currentDate:    moment.Moment;
  @Input() width: number;
  dailyWidth: number;

  constructor(private weekHelper: WeekHelper) {}

  ngOnInit() {
    this.initializeWeek();
  }

  ngOnChanges(changes: any) {
    if (changes.currentDate) {
      this.week = this.weekHelper.newWeek(this.currentDate);
      this.week = this.weekHelper.getWeekWithShifts(this.week, this.shifts);
    }
    if (changes.width) {
      this.dailyWidth = this.width / 7;
    }
  }

  initializeWeek() {
    this.week = this.week || this.weekHelper.newWeek(this.currentDate);
    this.week = this.weekHelper.getWeekWithShifts(this.week, this.shifts);
  }
}
