import { Input, OnChanges } from 'angular2/core';
import {
  BaseComponent,
  Shift,
  Employee,
  ShiftTemplate,
  ApiShiftTemplate,
  ShiftService,
  EmployeeService,
  Operator
} from '../../../shared/index';
import { Month } from './month/index';
import { Week } from  './week/index';
import * as moment from 'moment';

@BaseComponent({
  selector: 'calendar',
  templateUrl: 'app/+scheduler/components/calendar/calendar.html',
  directives: [Month, Week]
})

export class Calendar implements OnChanges {
  @Input() currentDate: moment.Moment;
  @Input() calendarMode: Number;
  shiftTemplates: Array<ShiftTemplate>;
  shifts: Array<Shift>;
  fetching: boolean = true;
  employees: Array<Employee>;

  constructor(
    public shiftService: ShiftService,
    public apiShiftTemplate: ApiShiftTemplate,
    public employeeService: EmployeeService
  ) {
    this.shiftService.getAll().subscribe((shifts: Shift[]) => this.onShiftsFetched(shifts));
    this.shiftService.created.subscribe((shift: Shift) => this.onShiftAdded(shift));
    this.shiftService.updated.subscribe((shift: Shift) => this.onShiftAdded(shift));
    this.employeeService.getAll().subscribe((employees: Employee[]) => this.onEmployeesFetched(employees));
    this.apiShiftTemplate.getAll().subscribe((shiftTemplates: ShiftTemplate[]) => this.onShiftTemplatesFetched(shiftTemplates));
  }

  ngOnInit() {
    this.shiftService.init(this.currentDate);
    this.employeeService.init();
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

  private onShiftTemplatesFetched(shiftTemplates: ShiftTemplate[]) {
    this.shiftTemplates = shiftTemplates;
  }

  private onEmployeesFetched(employees: Employee[]) {
    this.employees = employees;
  }

  private onShiftsFetched(shifts: Shift[]) {
    this.shifts = shifts;
    this.fetching = false;
  }
}
