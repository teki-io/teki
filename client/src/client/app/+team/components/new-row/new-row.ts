import { EventEmitter, Output } from '@angular/core';
import { BaseComponent, Model } from '../../../shared/index';
import * as Service from '../../../shared/services/index';

@BaseComponent({
  selector: 'new-row',
  templateUrl: 'app/+team/components/new-row/new-row.html',
  styleUrls: ['app/+team/components/new-row/new-row.css']
})

export class NewRow {
  public employee: Model.Admin.Employee = new Model.Admin.Employee({});
  @Output() editCancel:EventEmitter<any> = new EventEmitter();

  constructor(private employeeService: Service.Admin.Employee) {}

  confirm() {
    this.employeeService.create(this.employee);
    this.editCancel.emit({});
  }

  cancel() {
    this.editCancel.emit({});
  }
}
