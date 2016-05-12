import { Input } from '@angular/core';
import { BaseComponent, Employee, EmployeeService } from '../../../shared/index';
const toastr = require('toastr');

@BaseComponent({
  selector: 'row',
  templateUrl: 'app/+team/components/row/row.html',
  styleUrls: ['app/+team/components/row/row.css']
})

export class Row {
  @Input()  employee: Employee;
  public editing: boolean = false;
  private originEmployee: Employee = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.originEmployee = _.clone(this.employee);
  }

  edit() {
    this.editing = !this.editing;
  }

  cancel() {
    this.editing = false;
    this.employee = this.originEmployee;
  }

  confirm() {
    this.employeeService.nameTaken(this.employee)
      .then(() => {
        this.employeeService.save(this.employee);
        this.editing = false;
      })
      .catch(error => toastr.error(error.message));
  }

  destroy() {
    this.employeeService.destroy(this.employee);
  }
}
