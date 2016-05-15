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
import { Action, Dispatcher } from '@ngrx/store';
import { ShiftAction } from '../../../../shared/index';

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
  addSub:any = null;
  updateSub:any = null;
  editing: boolean = false;

  constructor(public shiftService: ShiftService, private dispatcher: Dispatcher<Action>) {}

  edit() {
    if (this.canEdit) {
      this.editing = true;
      this.addSub = this.dispatcher
        .filter(({type}: Action) => type === ShiftAction.CREATED)
        .subscribe(({payload}: Action) => this.onAdded(payload));

      this.updateSub = this.dispatcher
        .filter(({type}: Action) => type === ShiftAction.UPDATED)
        .subscribe(({payload}: Action) => this.onAdded(payload));
    }
  }

  select(employee: Employee) {
    if (this.alreadyAssigned(employee)) return;
    if (this.shift.id) {
      let tmp = new Shift({id: this.shift.id, employeeId: employee.id});
      this.shiftService.update(tmp);
    } else {
      let shift = _.clone(this.shift);
      shift.employeeId = employee.id;
      this.shiftService.create(shift);
    }
  }

  cancel() {
    this.editing = false;
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  private cleanUp() {
    if (this.updateSub) this.updateSub.unsubscribe();
    if (this.addSub) this.addSub.unsubscribe();
  }

  private onAdded(shift: Shift) {
    this.shift = shift;
    this.editing = false;
    Operator.update(this.shifts, shift);
    this.onEmployeeAssigned.emit({});
    this.cleanUp();
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
