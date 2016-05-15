import { ChangeDetectionStrategy } from '@angular/core';
import { Input, OnChanges } from '@angular/core';
import {
  BaseComponent,
  Shift,
  Employee,
  ShiftTemplate,
  ShiftService,
  EmployeeService,
  ShiftTemplateService
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
  directives: [Month, Week, Headers],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Calendar implements OnChanges {
  @Input() currentDate: moment.Moment;
  @Input() calendarMode: Number;
  shiftTemplates: Observable<ShiftTemplate[]>;
  shifts: Observable<Shift[]>;
  fetching: boolean = true;
  employees: Observable<Employee[]>;

  constructor(
    public shiftService: ShiftService,
    public shiftTemplateService: ShiftTemplateService,
    public employeeService: EmployeeService
  ) {
    this.employees = this.employeeService.employees;
    this.shiftTemplates = this.shiftTemplateService.shiftTemplates;
    this.shifts = this.shiftService.shifts;
  }

  ngOnInit() {
    this.shiftService.load(this.currentDate);
    this.employeeService.load();
    this.shiftTemplateService.load();
  }

  ngOnChanges(changes: any) {
    if (!_.isEmpty(changes.currentDate.previousValue) && changes.currentDate) {
      this.fetching = true;
      this.shiftService.fetch(this.currentDate);
    }
  }
}
