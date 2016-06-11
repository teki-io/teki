import { Input, OnChanges } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import * as moment from 'moment';
import { BaseComponent, Model } from '../../../../shared/index';
import { IMonth, IWeek } from '../../../interfaces/index';
import { Week } from '../week/index';

@BaseComponent({
  selector: 'month',
  templateUrl: 'app/+schedule/components/calendar/month/month.html',
  styleUrls: ['app/+schedule/components/calendar/month/month.css'],
  directives: [Week, COMMON_DIRECTIVES]
})

export class Month implements OnChanges {
  @Input() shifts: Model.Shift[];
  @Input() currentDate: moment.Moment;
  @Input() width: number;
  month:  IMonth;
  weeks:  Array<IWeek>;

  ngOnInit() {
    this.initializeMonth();
  }

  ngOnChanges() {
    this.initializeMonth();
  }

  getWeeks():Array<IWeek> {
    let weeks = this.initWeeks(this.currentDate);
    let groups = _.groupBy(this.shifts, (shift) => {
      return moment(shift.startTime).startOf('week').format('YYYYMMDD');
    });
    _.forEach(weeks, (week: IWeek) => {
      week.shifts = groups[week.date.startOf('week').format('YYYYMMDD')] || [];
    });
    return weeks;
  }

  initializeMonth() {
    this.month = <IMonth> {
      date: this.currentDate.startOf('month'),
      weeks: this.getWeeks()
    };
  }

  private initWeeks(monthStart: moment.Moment): IWeek[] {
    let result = <IWeek[]>[];
    for (let x = 0; x < 4; x ++ ) {
      let week = <IWeek> {
        date: monthStart.clone().startOf('week').add(x * 7, 'days'),
        shifts: []
      };
      result.push(week);
    }
    return result;
  }
}
