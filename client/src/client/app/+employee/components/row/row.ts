import { Input } from '@angular/core';
import { BaseComponent, Model } from '../../../shared/index';
import * as Service from '../../../shared/services/index';
import { FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES } from '@angular/common';
import { ValidationService } from '../../../shared/services/index';
import { ControlMessages } from '../../../components/control-messages/index';

@BaseComponent({
  selector: 'row',
  templateUrl: 'app/+employee/components/row/row.html',
  styleUrls: ['app/+employee/components/row/row.css'],
  directives: [FORM_DIRECTIVES, ControlMessages],
  providers: [FormBuilder]
})

export class Row {
  @Input()  employee: Model.Admin.Employee;
  public editing: boolean = false;
  public tmpEmployee: Model.Admin.Employee = null;
  public form: ControlGroup;

  constructor(private employeeService: Service.Admin.Employee, fb: FormBuilder) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])]
    });
  }

  ngOnInit() {
    this.tmpEmployee = _.clone(this.employee);
  }

  edit() {
    this.editing = !this.editing;
    if (!this.editing) {
      this.tmpEmployee = _.clone(this.employee);
    }
  }

  cancel() {
    this.editing = false;
  }

  confirm() {
    if (this.form.dirty && this.form.valid) {
      this.employeeService.update(this.tmpEmployee);
    }
  }

  destroy() {
    this.employeeService.destroy(this.tmpEmployee);
  }
}
