import { Model } from '../../shared/index';

export class EmployeeStats {
  id:       number;
  employee: Model.Admin.Employee;
  weeklyMinutes: number = 0;

  constructor(employee: Model.Admin.Employee) {
    this.id           = employee.id;
    this.employee     = employee;
  }

  addShifts(shifts: Model.Admin.Shift[]) {
    for (var shift of shifts) {
      this.addShift(shift);
    }
  }

  addShift(shift: Model.Admin.Shift) {
    this.weeklyMinutes += Math.abs(shift.endTime.diff(shift.startTime, 'minutes'));
  }

  removeShift(shift: Model.Admin.Shift) {
    this.weeklyMinutes -= Math.abs(shift.endTime.diff(shift.startTime, 'minutes'));
  }

  weeklyHours(): number {
    return Math.abs(this.weeklyMinutes / 60);
  }

  isOverworked(): boolean {
    return this.weeklyHours() > 40;
  }

  toString(): string {
    return `{ ${this.id} : ${this.weeklyMinutes} }`;
  }
}
