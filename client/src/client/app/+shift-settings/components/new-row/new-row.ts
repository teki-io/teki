import { EventEmitter, Output } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { BaseComponent, Model } from '../../../shared/index';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';
import * as Service from '../../../shared/services/index';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { ControlMessages } from '../../../components/control-messages/index';

@BaseComponent({
  selector: 'new-row',
  templateUrl: 'app/+shift-settings/components/new-row/new-row.html',
  styleUrls: ['app/+shift-settings/components/new-row/new-row.css'],
  directives: [TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  providers: [FormBuilder]
})

export class NewRow {
  @Output() editCancel:EventEmitter<any> = new EventEmitter();
  public shiftTemplate: Model.Admin.ShiftTemplate = new Model.Admin.ShiftTemplate({});
  public editing: boolean = false;
  public hstep:number = 1;
  public mstep:number = 15;
  public startTime: moment.Moment = moment().startOf('hour');
  public endTime: moment.Moment = moment().add(1, 'hours').startOf('hour');
  public templateForm: ControlGroup;

  constructor(private shiftTemplateService: Service.Admin.ShiftTemplate, fb: FormBuilder) {
    this.templateForm = fb.group({
      name: ['', Validators.required]
    });
  }

  confirm() {
    this.shiftTemplate.startTime = moment(this.startTime);
    this.shiftTemplate.endTime = moment(this.endTime);
    this.shiftTemplate.sort = 0;
    this.shiftTemplateService.create(this.shiftTemplate);
    this.editCancel.emit({});
  }

  cancel() {
    this.editCancel.emit({});
  }
}
