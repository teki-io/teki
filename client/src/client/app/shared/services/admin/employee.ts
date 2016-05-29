import { Injectable, Inject } from '@angular/core';
import * as Api               from '../../api/index';
import * as Model             from '../../models/index';
import * as Actions           from '../../actions/index';
import { AppStore, IEmployees } from '../../interfaces/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from './../index';
import { BehaviorSubject }    from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class Employee {
  loading: Observable<boolean>;
  employees: Observable<Model.Admin.Employee[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Admin.Employee) public api: Api.Admin.Employee,
              private store: Store<AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<IEmployees>('employees');
    this.employees = store$.map(({employees}: IEmployees) => employees);
    this.loading  = store$.map(({loading}: IEmployees) => loading);


    let loadEmployees = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Employee.LOAD)
      .do(() => this.store.dispatch({type: Actions.Admin.Employee.LOADING}))
      .mergeMap(() => this._load());

    let updateEmployee = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Employee.UPDATE)
      .do(() => this.store.dispatch({type: Actions.Admin.Employee.UPDATING}))
      .mergeMap(({payload}: Action) => this._update(payload));

    let createEmployee = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Employee.CREATE)
      .do(() => this.store.dispatch({type: Actions.Admin.Employee.CREATING}))
      .mergeMap(({payload}: Action) => this._create(payload));

    let destroyEmployee = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Employee.DELETE)
      .do(() => this.store.dispatch({type: Actions.Admin.Employee.DELETING}))
      .mergeMap(({payload}: Action) => this._destroy(payload));

    Observable
      .merge(loadEmployees, updateEmployee, createEmployee, destroyEmployee)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load() {
    this.actions.next({type: Actions.Admin.Employee.LOAD});
  }

  create(employee: Model.Admin.Employee) {
    this.actions.next({type: Actions.Admin.Employee.CREATE, payload: employee});
  }

  update(employee: Model.Admin.Employee) {
    this.actions.next({type: Actions.Admin.Employee.UPDATE, payload: employee});
  }

  destroy(employee: Model.Admin.Employee) {
    this.actions.next({type: Actions.Admin.Employee.DELETE, payload: employee});
  }

  private _load(): Observable<Action> {
    return this.api.getAll()
      .do(payload => this.store.dispatch({type: Actions.Admin.Employee.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _create(employee: Model.Admin.Employee) {
    return this.api.create(employee)
      .do(payload => this.store.dispatch({ type: Actions.Admin.Employee.CREATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _update(employee: Model.Admin.Employee): Observable<Action> {
    return this.api.update(employee)
      .do(payload => this.store.dispatch({ type: Actions.Admin.Employee.UPDATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _destroy(employee: Model.Admin.Employee): Observable<Action> {
    return this.api.destroy(employee)
      .do(payload => this.store.dispatch({ type: Actions.Admin.Employee.DELETED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
