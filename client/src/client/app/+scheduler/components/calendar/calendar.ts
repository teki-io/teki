import { Input, OnChanges } from '@angular/core';
import {
  BaseComponent,
  Shift,
  Employee,
  ShiftTemplate,
  ShiftService,
  EmployeeService,
  ShiftTemplateService,
  Operator
} from '../../../shared/index';
import { Headers } from './headers/index';
import { Month } from './month/index';
import { Week } from  './week/index';
import * as moment from 'moment';
import { Observable }       from 'rxjs/Observable';

@BaseComponent({
  selector: 'calendar',
  templateUrl: 'app/+scheduler/components/calendar/calendar.html',
  styleUrls: ['app/+scheduler/components/calendar/calendar.css'],
  directives: [Month, Week, Headers]
})

export class Calendar implements OnChanges {
  @Input() currentDate: moment.Moment;
  @Input() calendarMode: Number;
  shiftTemplates: Observable<ShiftTemplate[]>;
  shifts: Array<Shift>;
  fetching: boolean = true;
  employees: Observable<Employee[]>;

  constructor(
    public shiftService: ShiftService,
    public shiftTemplateService: ShiftTemplateService,
    public employeeService: EmployeeService
  ) {
    this.shiftService.getAll().subscribe((shifts: Shift[]) => this.onShiftsFetched(shifts));
    this.shiftService.created.subscribe((shift: Shift) => this.onShiftAdded(shift));
    this.shiftService.updated.subscribe((shift: Shift) => this.onShiftAdded(shift));
  }

  ngOnInit() {
    this.shiftService.init(this.currentDate);
    this.employees = this.employeeService.employees;
    this.employeeService.load();
    this.shiftTemplates = this.shiftTemplateService.shiftTemplates;
    this.shiftTemplateService.load();
  }

  ngOnChanges(changes: any) {
    if (!_.isEmpty(changes.currentDate.previousValue) && changes.currentDate) {
      this.fetching = true;
      this.shiftService.fetch(this.currentDate);
    }
  }

  private onShiftAdded(shift: Shift) {
    Operator.update(this.shifts, shift);
  }

  private onShiftsFetched(shifts: Shift[]) {
    this.shifts = shifts;
    this.fetching = false;
  }
}
