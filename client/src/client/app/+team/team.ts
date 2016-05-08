import { BaseComponent,
         Employee,
         EmployeeService }  from '../shared/index';
import { Widget }           from '../components/widget/index';
import { WidgetBody }       from '../components/widget-body/index';
import { WidgetHeader }     from '../components/widget-header/index';
import { Row }              from './components/row/index';
import { Headers }          from './components/headers/index';
import { NewRow }           from './components/new-row/index';
import { PrivatePage } from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';

@BaseComponent({
  selector: 'teki-team',
  templateUrl: 'app/+team/team.html',
  styleUrls: ['app/+team/team.css'],
  directives: [Widget, WidgetBody, WidgetHeader, Row, Headers, NewRow, AppLayoutComponent]
})

@PrivatePage()
export class TeamComponent {
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

  add() {
    this.adding = true;
  }

  cancel() {
    this.adding = false;
  }

  editCancel() {
    this.cancel();
  }

  private onEmployeeDestroyed(d: Employee) {
    _.removes(this.employees, {id: d.id});
  }

  private onEmployeeCreated(d: Employee) {
    this.adding = false;
  }
}
