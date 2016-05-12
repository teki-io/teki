import { Injectable, Inject } from '@angular/core';
import { Employee }           from '../models/index';
import { EmployeeAction }     from '../actions/index';
import { AppStore }           from '../interfaces/index';
import { ApiEmployee }        from '../api/index';
import { Observable }         from 'rxjs/Observable';
import { Store }              from '@ngrx/store';
import { TranslateService }   from 'ng2-translate/ng2-translate';
import { HttpErrorHandler }   from './index';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {
  employees:  Observable<Employee[]>;

  constructor(@Inject(ApiEmployee) public api: ApiEmployee,
              private store: Store<AppStore>,
              private translate: TranslateService,
              private errorHandler: HttpErrorHandler) {
    this.employees = store.select('employees');
  }

  nameTaken(employee: Employee): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.employees.subscribe((employees: Employee[]) => {
        let result = _.find(employees, (d) => {
          return d.firstName === employee.firstName && d.lastName === employee.lastName && d.id !== employee.id;
        });
        if (_.isEmpty(result)) {
          resolve(true);
        } else {
          this.translate.get('team.nameTaken').subscribe((msg: string) => reject(new Error(msg)));
        }
      });
    });
  }

  load() {
    this.api.getAll()
      .map(payload => ({ type: EmployeeAction.ADD, payload }))
      .subscribe(
        (action) => this.store.dispatch(action),
        (e) => this.errorHandler.handle(e)
      );
  }

  save(employee: Employee) {
    (employee.id) ? this.update(employee) : this.create(employee);
  }

  destroy(employee: Employee) {
    this.api.destroy(employee)
      .map(payload => ({ type: EmployeeAction.DELETE, payload }))
      .subscribe(
        (action) => this.store.dispatch(action),
        (e) => this.errorHandler.handle(e)
      );
  }

  private create(employee: Employee) {
    this.api.create(employee)
      .map(payload => ({ type: EmployeeAction.CREATE, payload }))
      .subscribe(
        (action) => this.store.dispatch(action),
        (e) => this.errorHandler.handle(e)
      );
  }

  private update(employee: Employee) {
    this.api.update(employee)
      .map(payload => ({ type: EmployeeAction.UPDATE, payload }))
      .subscribe(
        (action) => this.store.dispatch(action),
        (e) => this.errorHandler.handle(e)
      );
  }
}
