import { EventEmitter, Injectable } from '@angular/core';
import { Operator, Model }          from '../../shared/index';
import { EmployeeStats, IWeek }     from '../interfaces/index';
import * as _ from 'lodash';
const toastr = require('toastr');

@Injectable()
export class WeeklyHoursCalculator {
  public calculated$: EventEmitter<EmployeeStats[]> = new EventEmitter<EmployeeStats[]>();
  private employeeStatsList: EmployeeStats[] = [];
  private week: IWeek;

  public updateShift(shift: Model.Admin.Shift): void {
    if (this.shiftInThisWeek(shift)) {
      let existingShift = _.find(this.week.shifts, { id: shift.id });
      let previousEmployeeStats = _.find(this.employeeStatsList, { id: existingShift.employeeId });
      if (previousEmployeeStats) {
        previousEmployeeStats.removeShift(existingShift);
      }
      this.addShift(shift);
      this.updateShiftInWeek(shift);
    }
  }

  public addShift(shift: Model.Admin.Shift): void {
    if (this.shiftInThisWeek(shift)) {
      let stats = _.find(this.employeeStatsList, { id: shift.employeeId });
      if (stats) {
        stats.addShift(shift);
        this.onStatsCalculated(stats);
      }
      this.updateShiftInWeek(shift);
    }
  }

  public init(employees: Model.Admin.Employee[], week: IWeek) {
    this.week = week;
    this.employeeStatsList = _.map(employees, (d) => {
      let _shifts = _.filter(week.shifts, { employeeId: d.id });
      let stats = new EmployeeStats(d);
      stats.addShifts(_shifts);
      return stats;
    });
  }

  public getStats(): EmployeeStats[] {
    return this.employeeStatsList;
  }

  public clear() {
    this.employeeStatsList = [];
    this.week = null;
  }

  private updateShiftInWeek(shift: Model.Admin.Shift) {
    Operator.update(this.week.shifts, shift);
  }

  private shiftInThisWeek(shift: Model.Admin.Shift): boolean {
    let weekStart = this.week.date.clone().startOf('week');
    let weekEnd = this.week.date.clone().endOf('week');
    return weekStart <= shift.startTime && shift.endTime <= weekEnd;
  }

  private onStatsCalculated(stats: EmployeeStats) {
    if (stats.isOverworked()) {
      toastr.warning(`${stats.employee.firstName} 已經指定 ${stats.weeklyHours()} 小時`);
    }
  }
}
