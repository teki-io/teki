import { ChangeDetectionStrategy } from '@angular/core';
import { Input, OnChanges, ElementRef } from '@angular/core';
import { BaseComponent, Model } from '../../../shared/index';
import { Headers } from './headers/index';
import { Month } from './month/index';
import { Week } from  './week/index';
import * as moment from 'moment';
import { Observable }       from 'rxjs/Observable';
import * as Service from '../../../shared/services/index';

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
  shiftTemplates: Observable<Model.Admin.ShiftTemplate[]>;
  shifts: Observable<Model.Admin.Shift[]>;
  fetching: boolean = true;
  employees: Observable<Model.Admin.Employee[]>;
  width: number;

  constructor(
    private shiftService: Service.Admin.Shift,
    private shiftTemplateService: Service.Admin.ShiftTemplate,
    private employeeService: Service.Admin.Employee,
    private ref: ElementRef
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

  ngAfterViewInit() {
    let innerWidth = this.ref.nativeElement.getBoundingClientRect().width;
    this.width = innerWidth > 1000 ? innerWidth : 1000;
  }

  ngOnChanges(changes: any) {
    if (!_.isEmpty(changes.currentDate.previousValue) && changes.currentDate) {
      this.fetching = true;
      this.shiftService.fetch(this.currentDate);
    }
  }

  onResize(event: any) {
    if (event.target.innerWidth > 1000) {
      this.width = event.target.innerWidth;
    }
  }
}
