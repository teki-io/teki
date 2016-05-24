import { BaseComponent, Model } from '../../../../shared/index';
import { DialogRef, ModalComponent } from 'angular2-modal/angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';
import { ControlGroup, FormBuilder, Validators, FORM_PROVIDERS, FORM_DIRECTIVES } from '@angular/common';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as Service from '../../../../shared/services/index';

import * as moment from 'moment';

export class ShiftModalWindowData extends BSModalContext {
  constructor(public num1: number, public num2: number) {
    super();
  }
}

@BaseComponent({
  selector: 'modal-content',
  templateUrl: 'app/+scheduler/components/calendar/shift-modal/shift-modal.html',
  styleUrls: ['app/+scheduler/components/calendar/shift-modal/shift-modal.css'],
  viewBindings: [ FORM_PROVIDERS ],
  directives: [ FORM_DIRECTIVES, TimepickerComponent ]
})

export class ShiftModalWindow implements ModalComponent<ShiftModalWindowData> {
  public context: ShiftModalWindowData;
  public shiftForm: ControlGroup;
  public newShift: Model.Admin.Shift = new Model.Admin.Shift({});
  public hstep:number = 1;
  public mstep:number = 15;
  public startTime: moment.Moment = moment().startOf('hour');
  public endTime: moment.Moment = moment().add(1, 'hours').startOf('hour');

  public wrongAnswer: boolean;

  constructor(private dialog: DialogRef<ShiftModalWindowData>,
              private shiftService: Service.Admin.Shift,
              builder: FormBuilder) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    this.shiftForm = builder.group({
      name: ['', Validators.required]
    });
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  confirm() {
    this.dialog.close();
  }

  cancel() {
    this.dialog.close();
  }

  onSubmit(shift: Model.Admin.Shift): boolean {
    this.newShift.startTime = moment(this.startTime);
    this.newShift.endTime = moment(this.endTime);
    this.shiftService.create(this.newShift);
    return true;
  }
}
