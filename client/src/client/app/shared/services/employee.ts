import { Injectable, Inject } from '@angular/core';
import * as Api               from '../api/index';
import * as Model             from '../models/index';
import * as Actions           from '../actions/index';
import * as Interface         from '../interfaces/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from './index';
import { BehaviorSubject }    from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class Employee {
  loading: Observable<boolean>;
  employees: Observable<Model.Employee[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Employee) private api: Api.Employee,
              private store: Store<Interface.AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<Interface.IEmployees>('employees');
    this.employees = store$.map(({employees}: Interface.IEmployees) => employees);
    this.loading  = store$.map(({loading}: Interface.IEmployees) => loading);

    let loadEmployees = this.actions
      .filter(({type}: Action) => type === Actions.Employee.LOAD)
      .do(() => this.store.dispatch({type: Actions.Employee.LOADING}))
      .mergeMap(() => this._load());

    Observable
      .merge(loadEmployees)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load() {
    this.actions.next({type: Actions.Employee.LOAD});
  }

  private _load(): Observable<Action> {
    return this.api.getAll()
      .do(payload => this.store.dispatch({type: Actions.Employee.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
