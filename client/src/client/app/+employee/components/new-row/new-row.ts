import { EventEmitter, Output } from '@angular/core';
import { BaseComponent, Model } from '../../../shared/index';
import * as Service from '../../../shared/services/index';
import { FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES } from '@angular/common';
import { ValidationService } from '../../../shared/services/index';
import { ControlMessages } from '../../../components/control-messages/index';

@BaseComponent({
  selector: 'new-row',
  templateUrl: 'app/+employee/components/new-row/new-row.html',
  styleUrls: ['app/+employee/components/new-row/new-row.css'],
  directives: [FORM_DIRECTIVES, ControlMessages],
  providers: [FormBuilder]
})

export class NewRow {
  public employee: Model.Admin.Employee = new Model.Admin.Employee({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });
  public form: ControlGroup;
  @Output() editCancel:EventEmitter<any> = new EventEmitter();

  constructor(private employeeService: Service.Admin.Employee, fb: FormBuilder) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])]
    });
  }

  confirm() {
    if (this.form.dirty && this.form.valid) {
      this.employeeService.create(this.employee);
      this.editCancel.emit({});
    }
  }

  cancel() {
    this.editCancel.emit({});
  }
}
