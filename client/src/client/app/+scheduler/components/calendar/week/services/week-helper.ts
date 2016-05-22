import { Injectable } from '@angular/core';
import { IDay, IWeek } from '../../../../interfaces/index';
import { Shift } from '../../../../../shared/index';
import * as moment from 'moment';

@Injectable()
export class WeekHelper {
  newWeek(currentDate: moment.Moment): IWeek {
    return { date: currentDate, days: <IDay[]>[], shifts: <Shift[]>[] };
  }

  getWeekWithShifts(week: IWeek, shifts: Shift[]): IWeek {
    week.shifts = this.getWeeklyShifts(week.date, shifts);
    let days    = this.initDays(week.date);
    week.days   = this.getDaysWithShifts(days, week.shifts);
    return week;
  }

  getWeeklyShifts(currentDate: moment.Moment, shifts: Shift[]): Shift[] {
    let weekStart = currentDate.clone().startOf('week');
    let weekEnd = currentDate.clone().endOf('week');
    let weeklyShifts = _.filter(shifts, (shift: Shift) => {
      return weekStart <= shift.startTime && shift.endTime <= weekEnd;
    });
    return weeklyShifts;
  }

  initDays(weekStart: moment.Moment) {
    let result = [
      <IDay>{date: weekStart, shifts: []}
    ];
    for (let x = 1; x < 7; x ++ ) {
      let day = <IDay> {date: weekStart.clone().add(x, 'days'), shifts: []};
      result.push(day);
    }
    return result;
  }

  getDaysWithShifts(days: IDay[], shifts: Shift[]): IDay[] {
    let groups = _.groupBy(shifts, (shift) => {
      return moment(shift.startTime).startOf('day').format('YYYYMMDD');
    });
    _.forEach(days, (day: IDay) => {
      day.shifts = groups[day.date.startOf('day').format('YYYYMMDD')] || [];
    });
    return days;
  }
}
