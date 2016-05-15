import { Input } from '@angular/core';
import { BaseComponent, Employee, EmployeeService } from '../../../shared/index';

@BaseComponent({
  selector: 'row',
  templateUrl: 'app/+team/components/row/row.html',
  styleUrls: ['app/+team/components/row/row.css']
})

export class Row {
  @Input()  employee: Employee;
  public editing: boolean = false;
  public tmpEmployee: Employee = null;

  constructor(private employeeService: EmployeeService) {}

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
    this.employeeService.update(this.tmpEmployee);
  }

  destroy() {
    this.employeeService.destroy(this.tmpEmployee);
  }
}
