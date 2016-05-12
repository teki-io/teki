import { EventEmitter, Output } from '@angular/core';
import { BaseComponent, Employee, EmployeeService } from '../../../shared/index';
import { TranslateService } from 'ng2-translate/ng2-translate';

const toastr = require('toastr');

@BaseComponent({
  selector: 'new-row',
  templateUrl: 'app/+team/components/new-row/new-row.html',
  styleUrls: ['app/+team/components/new-row/new-row.css']
})

export class NewRow {
  public employee: Employee = new Employee({});
  @Output() editCancel:EventEmitter<any> = new EventEmitter();

  constructor(public employeeService: EmployeeService, private translate: TranslateService) {}

  confirm() {
    this.employeeService.nameTaken(this.employee)
      .then(() => {
        this.employeeService.save(this.employee);
        this.editCancel.emit({});
      })
      .catch(error => toastr.error(error.message));
  }

  cancel() {
    this.editCancel.emit({});
  }
}
