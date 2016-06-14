import { Input } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { BaseComponent, Model } from '../../../shared/index';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';
import * as Service from '../../../shared/services/index';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { ControlMessages } from '../../../components/control-messages/index';

@BaseComponent({
  selector: 'row',
  templateUrl: 'app/+shift-settings/components/row/row.html',
  styleUrls: ['app/+shift-settings/components/row/row.css'],
  directives: [TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  providers: [FormBuilder],
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})

export class Row {
  @Input()  shiftTemplate: Model.Admin.ShiftTemplate;
  public editing: boolean = false;
  public hstep:number = 1;
  public mstep:number = 15;
  public startTime: moment.Moment;
  public endTime: moment.Moment;
  public tmpShiftTemplate: Model.Admin.ShiftTemplate = null;
  public showEditButton: boolean = false;
  public templateForm: ControlGroup;

  constructor(private shiftTemplateService: Service.Admin.ShiftTemplate, fb: FormBuilder) {
    this.templateForm = fb.group({
      name: ['', Validators.required]
    });
  }

  onMouseEnter() { this.showEditButton = true; }
  onMouseLeave() { this.showEditButton = false; }

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
    this.shiftTemplateService.update(this.tmpShiftTemplate);
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
