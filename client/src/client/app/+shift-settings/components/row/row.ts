import { Input } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { BaseComponent, ShiftTemplate, ShiftTemplateService } from '../../../shared/index';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';
const toastr = require('toastr');

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
  private originShiftTemplate: ShiftTemplate = null;

  constructor(public shiftTemplateService: ShiftTemplateService, private translate: TranslateService) {}

  ngOnInit() {
    this.originShiftTemplate = _.clone(this.shiftTemplate);
    this.startTime = this.shiftTemplate.startTime;
    this.endTime = this.shiftTemplate.endTime;
  }

  edit() {
    this.editing = !this.editing;
  }

  cancel() {
    this.reset();
    this.editing = false;
    this.shiftTemplate = this.originShiftTemplate;
  }

  confirm() {
    this.shiftTemplate.startTime = moment(this.startTime);
    this.shiftTemplate.endTime = moment(this.endTime);
    if (this.shiftTemplateService.nameTaken(this.shiftTemplate)) {
      this.translate.get('shiftSettings.nameTaken').subscribe((msg: string) => toastr.error(msg));
    } else {
      this.shiftTemplateService.update(this.shiftTemplate)
        .subscribe(() => {
          this.editing = false;
        });
    }
  }

  destroy() {
    this.shiftTemplateService.destroy(this.shiftTemplate);
  }

  private reset() {
    this.shiftTemplate.name = this.originShiftTemplate.name;
    this.shiftTemplate.startTime = this.originShiftTemplate.startTime;
    this.shiftTemplate.endTime = this.originShiftTemplate.endTime;
    this.startTime = this.originShiftTemplate.startTime;
    this.endTime = this.originShiftTemplate.endTime;
  }
}
