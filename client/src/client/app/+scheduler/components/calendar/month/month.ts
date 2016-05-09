import { Input, OnChanges } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import * as moment from 'moment';
import { BaseComponent, Shift, ShiftTemplate, Employee } from '../../../../shared/index';
import { IMonth, IWeek } from '../../../interfaces/index';
import { Week } from '../week/index';

@BaseComponent({
  selector: 'month',
  templateUrl: 'app/+scheduler/components/calendar/month/month.html',
  styleUrls: ['app/+scheduler/components/calendar/month/month.css'],
  directives: [Week, COMMON_DIRECTIVES]
})

export class Month implements OnChanges {
  @Input() shifts: Array<Shift>;
  @Input() shiftTemplates: Array<ShiftTemplate>;
  @Input() currentDate: moment.Moment;
  @Input() employees: Array<Employee>;
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
