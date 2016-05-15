import { Injectable, Inject } from '@angular/core';
import { Employee }           from '../models/index';
import { EmployeeAction }     from '../actions/index';
import { AppStore, IEmployees } from '../interfaces/index';
import { ApiEmployee }        from '../api/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from './index';
import { BehaviorSubject }    from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {
  loading: Observable<boolean>;
  employees: Observable<Employee[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(ApiEmployee) public api: ApiEmployee,
              private store: Store<AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<IEmployees>('employees');
    this.employees = store$.map(({employees}: IEmployees) => employees);
    this.loading  = store$.map(({loading}: IEmployees) => loading);


    let loadEmployees = this.actions
      .filter(({type}: Action) => type === EmployeeAction.LOAD)
      .do(() => this.store.dispatch({type: EmployeeAction.LOADING}))
      .mergeMap(() => this._load());

    let updateEmployee = this.actions
      .filter(({type}: Action) => type === EmployeeAction.UPDATE)
      .do(() => this.store.dispatch({type: EmployeeAction.UPDATING}))
      .mergeMap(({payload}: Action) => this._update(payload));

    let createEmployee = this.actions
      .filter(({type}: Action) => type === EmployeeAction.CREATE)
      .do(() => this.store.dispatch({type: EmployeeAction.CREATING}))
      .mergeMap(({payload}: Action) => this._create(payload));

    let destroyEmployee = this.actions
      .filter(({type}: Action) => type === EmployeeAction.DELETE)
      .do(() => this.store.dispatch({type: EmployeeAction.DELETING}))
      .mergeMap(({payload}: Action) => this._destroy(payload));

    Observable
      .merge(loadEmployees, updateEmployee, createEmployee, destroyEmployee)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load() {
    this.actions.next({type: EmployeeAction.LOAD});
  }

  create(employee: Employee) {
    this.actions.next({type: EmployeeAction.CREATE, payload: employee});
  }

  update(employee: Employee) {
    this.actions.next({type: EmployeeAction.UPDATE, payload: employee});
  }

  destroy(employee: Employee) {
    this.actions.next({type: EmployeeAction.DELETE, payload: employee});
  }

  private _load(): Observable<Action> {
    return this.api.getAll()
      .do(payload => this.store.dispatch({type: EmployeeAction.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _create(employee: Employee) {
    return this.api.create(employee)
      .map(payload => ({ type: EmployeeAction.CREATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _update(employee: Employee): Observable<Action> {
    return this.api.update(employee)
      .map(payload => ({ type: EmployeeAction.UPDATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _destroy(employee: Employee): Observable<Action> {
    return this.api.destroy(employee)
      .map(payload => ({ type: EmployeeAction.DELETED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
