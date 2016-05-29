import { Input } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import { BaseComponent, Model } from '../../../../shared/index';
import { IDay } from '../../../interfaces/index';
import { ShiftComponent } from '../shift/index';
import * as _ from 'lodash';
import * as moment from 'moment';

@BaseComponent({
  selector: 'daily-shifts',
  templateUrl: 'app/+scheduler/components/calendar/daily-shifts/daily-shifts.html',
  styleUrls: ['app/+scheduler/components/calendar/daily-shifts/daily-shifts.css'],
  directives: [COMMON_DIRECTIVES, ShiftComponent]
})

export class DailyShifts {
  @Input() day: IDay;
  @Input() shiftTemplates: Model.Admin.ShiftTemplate[] = [];
  @Input() employees: Model.Admin.Employee[];
  @Input() showAll: boolean = false;
  @Input() availabeEmployees: Model.Admin.Employee[] = [];

  public  showLimit: Number           = 6;
  private shifts: Model.Admin.Shift[] = [];

  ngOnInit() {
    this.init();
  }

  public onEmployeeAssigned() {
    this.availabeEmployees = _.clone(this.employees);
    let employeeIds = _.map(this.shifts, 'employeeId');
    _.remove(this.availabeEmployees, (employee) => { return _.includes(employeeIds, employee.id); });
  }

  private init() {
    this.shifts = this.day.shifts;
    this.day.shifts = this.mergeShiftWithShiftTemplate();
    // set everything to be true for now
    //if (this.day.shifts.length < 6) {
    //  this.showAll = true;
    //}
    //
    this.showAll = true;
    this.onEmployeeAssigned();
  }

  private mergeShiftWithShiftTemplate(): Array<Model.Admin.Shift> {
    let results = <Model.Admin.Shift[]>[];
    let tmpShifts = _.clone(this.shifts);
    this.shiftTemplates = _.sortBy(this.shiftTemplates, 'sort');
    _.forEach(this.shiftTemplates, (template) => {
      let shifts = _.remove(tmpShifts, { shiftTemplateId: template.id } );
      if (_.isEmpty(shifts)) {
        results.push(this.generateShiftFromTemplate(template, this.day.date));
      } else {
        results.push(shifts[0]);
      }
    });
    results = results.concat(tmpShifts);
    return results;
  }

  private generateShiftFromTemplate(template: Model.Admin.ShiftTemplate, today: moment.Moment): Model.Admin.Shift {
    let shift = new Model.Admin.Shift({});
    shift.name = template.name;
    shift.shiftTemplateId = template.id;
    shift.startTime = moment(today.format('YYYY-MM-DDT') + template.startTime.format('HH:mm'), 'YYYY-MM-DDTHH:mm');
    shift.endTime = moment(today.format('YYYY-MM-DDT') + template.endTime.format('HH:mm'), 'YYYY-MM-DDTHH:mm');
    return shift;
  }
}
