import { Input, Output, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import { DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {
  BaseComponent,
  ShiftService,
  Employee,
  Operator,
  Shift
} from '../../../../shared/index';
import * as _ from 'lodash';
const toastr = require('toastr');

@BaseComponent({
  selector: 'shift',
  templateUrl: 'app/+scheduler/components/calendar/shift/shift.html',
  styleUrls: ['app/+scheduler/components/calendar/shift/shift.css'],
  directives: [COMMON_DIRECTIVES, DROPDOWN_DIRECTIVES]
})

export class ShiftComponent {
  @Input() shift: Shift;
  @Input() shifts: Array<Shift>;
  @Input() employees: Array<Employee>;
  @Input() canEdit: boolean;
  @Output() onEmployeeAssigned: EventEmitter<any> = new EventEmitter<any>();
  sub:any = null;
  editing: boolean = false;

  constructor(public shiftService: ShiftService) {}

  edit() {
    if (this.canEdit) this.editing = true;
  }

  select(employee: Employee) {
    if (this.alreadyAssigned(employee)) return;
    if (this.shift.id) {
      let tmp = new Shift({id: this.shift.id, employeeId: employee.id});
      this.sub = this.shiftService.update(tmp).subscribe((shift: Shift) => this.onAdded(shift));
    } else {
      let shift = _.clone(this.shift);
      shift.employeeId = employee.id;
      this.sub = this.shiftService.create(shift).subscribe((shift: Shift) => this.onAdded(shift));
    }
  }

  cancel() {
    this.editing = false;
  }

  private onAdded(shift: Shift) {
    this.shift = shift;
    this.editing = false;
    this.sub.unsubscribe();
    Operator.update(this.shifts, shift);
    this.onEmployeeAssigned.emit({});
  }

  private alreadyAssigned(employee: Employee): boolean {
    let shift = _.find(this.shifts, {employeeId : employee.id});
    if (shift) {
      toastr.error(`${employee.firstName} 已經排在 ${shift.name}`);
      return true;
    }
    return false;
  }
}
