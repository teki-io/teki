import { Input } from 'angular2/core';
import { BaseComponent, Employee} from '../../../shared/index';

@BaseComponent({
  selector: 'row',
  templateUrl: 'app/+team/components/row/row.html',
  styleUrls: ['app/+team/components/row/row.css']
})

export class Row {
  @Input()  employee: Employee;
  public editing: boolean = false;
  private originEmployee: Employee = null;

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
    console.log('confirm');
  }
}
