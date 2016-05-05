import { BaseComponent,
         Employee,
         EmployeeService } from '../shared/index';
import * as _ from 'lodash';

@BaseComponent({
  selector: 'teki-colleague',
  templateUrl: 'app/+colleague/colleague.html',
  styleUrls: ['app/+colleague/colleague.css']
})

export class ColleagueComponent {
  employees: Array<Employee>;
  adding: boolean = false;

  constructor(public employeeService: EmployeeService) {
    this.employeeService.getAll()
      .subscribe((employees: Array<Employee>) => {
        this.employees = _.filter(employees, (d: Employee) => !d.admin);
      });
    this.employeeService.created.subscribe((d: Employee) => this.onEmployeeCreated(d));
    this.employeeService.destroyed.subscribe((d: Employee) => this.onEmployeeDestroyed(d));
    this.employeeService.init();
  }

  private onEmployeeDestroyed(d: Employee) {
    _.removes(this.employees, {id: d.id});
  }

  private onEmployeeCreated(d: Employee) {
    this.adding = false;
  }
}
