import { EventEmitter, Output } from '@angular/core';
import { BaseComponent, Employee, EmployeeService } from '../../../shared/index';

@BaseComponent({
  selector: 'new-row',
  templateUrl: 'app/+team/components/new-row/new-row.html',
  styleUrls: ['app/+team/components/new-row/new-row.css']
})

export class NewRow {
  public employee: Employee = new Employee({});
  @Output() editCancel:EventEmitter<any> = new EventEmitter();

  constructor(public employeeService: EmployeeService) {}

  confirm() {
    this.employeeService.save(this.employee);
    this.editCancel.emit({});
  }

  cancel() {
    this.editCancel.emit({});
  }
}
