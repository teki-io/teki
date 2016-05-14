import { Input } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { BaseComponent, ShiftTemplate, ShiftTemplateService } from '../../../shared/index';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';

@BaseComponent({
  selector: 'row',
  templateUrl: 'app/+shift-settings/components/row/row.html',
  styleUrls: ['app/+shift-settings/components/row/row.css'],
  directives: [TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class Row {
  @Input()  shiftTemplate: ShiftTemplate;
  public editing: boolean = false;
  public hstep:number = 1;
  public mstep:number = 15;
  public startTime: moment.Moment;
  public endTime: moment.Moment;
  public tmpShiftTemplate: ShiftTemplate = null;

  constructor(public shiftTemplateService: ShiftTemplateService) {}

  ngOnInit() {
    this.tmpShiftTemplate = _.clone(this.shiftTemplate);
    this.startTime = this.shiftTemplate.startTime;
    this.endTime = this.shiftTemplate.endTime;
  }

  edit() {
    this.editing = !this.editing;
  }

  cancel() {
    this.reset();
    this.editing = false;
    this.shiftTemplate = this.tmpShiftTemplate;
  }

  confirm() {
    this.tmpShiftTemplate.startTime = moment(this.startTime);
    this.tmpShiftTemplate.endTime = moment(this.endTime);
    this.shiftTemplateService.save(this.tmpShiftTemplate);
  }

  destroy() {
    this.shiftTemplateService.destroy(this.tmpShiftTemplate);
  }

  private reset() {
    this.tmpShiftTemplate.name = this.shiftTemplate.name;
    this.tmpShiftTemplate.startTime = this.shiftTemplate.startTime;
    this.tmpShiftTemplate.endTime = this.shiftTemplate.endTime;
    this.startTime = this.shiftTemplate.startTime;
    this.endTime = this.shiftTemplate.endTime;
  }
}
