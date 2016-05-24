import { EventEmitter, Output } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { BaseComponent, Model } from '../../../shared/index';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';
import * as Service from '../../../shared/services/index';

@BaseComponent({
  selector: 'new-row',
  templateUrl: 'app/+shift-settings/components/new-row/new-row.html',
  styleUrls: ['app/+shift-settings/components/new-row/new-row.css'],
  directives: [TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class NewRow {
  @Output() editCancel:EventEmitter<any> = new EventEmitter();
  public shiftTemplate: Model.Admin.ShiftTemplate = new Model.Admin.ShiftTemplate({});
  public editing: boolean = false;
  public hstep:number = 1;
  public mstep:number = 15;
  public startTime: moment.Moment = moment().startOf('hour');
  public endTime: moment.Moment = moment().add(1, 'hours').startOf('hour');

  constructor(private shiftTemplateService: Service.Admin.ShiftTemplate) {}

  confirm() {
    this.shiftTemplate.startTime = moment(this.startTime);
    this.shiftTemplate.endTime = moment(this.endTime);
    this.shiftTemplateService.create(this.shiftTemplate);
    this.editCancel.emit({});
  }

  cancel() {
    this.editCancel.emit({});
  }
}
