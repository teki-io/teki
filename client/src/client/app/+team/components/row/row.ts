import { Input } from '@angular/core';
import { BaseComponent, Model } from '../../../shared/index';
import * as Service from '../../../shared/services/index';

@BaseComponent({
  selector: 'row',
  templateUrl: 'app/+team/components/row/row.html',
  styleUrls: ['app/+team/components/row/row.css']
})

export class Row {
  @Input()  employee: Model.Admin.Employee;
  public editing: boolean = false;
  public tmpEmployee: Model.Admin.Employee = null;

  constructor(private employeeService: Service.Admin.Employee) {}

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
