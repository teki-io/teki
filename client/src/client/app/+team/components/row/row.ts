import { Input } from 'angular2/core';
import { BaseComponent, Employee, EmployeeService } from '../../../shared/index';
import { TranslateService } from 'ng2-translate/ng2-translate';
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

  constructor(public employeeService: EmployeeService, private translate: TranslateService) {}

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
    if (this.employeeService.nameTaken(this.employee)) {
      this.translate.get('team.nameTaken').subscribe((msg: string) => toastr.error(msg));
    } else {
      this.employeeService.update(this.employee)
        .subscribe(() => {
          this.editing = false;
        });
    }
  }

  destroy() {
    this.employeeService.destroy(this.employee);
  }
}
