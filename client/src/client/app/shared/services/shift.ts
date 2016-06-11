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
import * as moment from 'moment';

@Injectable()
export class Shift {
  loading: Observable<boolean>;
  shifts: Observable<Model.Shift[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Shift) private api: Api.Shift,
              private store: Store<Interface.AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<Interface.IShifts>('shifts');
    this.shifts = store$.map(({shifts}: Interface.IShifts) => shifts);
    this.loading  = store$.map(({loading}: Interface.IShifts) => loading);

    let loadShifts = this.actions
      .filter(({type}: Action) => type === Actions.Shift.LOAD)
      .do(() => this.store.dispatch({type: Actions.Shift.LOADING}))
      .mergeMap(({payload}: Action) => this._load(payload));

    Observable
      .merge(loadShifts)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load(currentDate: moment.Moment = moment()) {
    this.fetch(currentDate);
  }

  fetch(date: moment.Moment) {
    let shifts = <Model.Shift[]>this.store.value['shifts'].shifts;
    if (shifts.length === 0) {
      let from = date.clone().startOf('month').startOf('week');
      let to = date.clone().add(1, 'months');
      this.actions.next({type: Actions.Shift.LOAD, payload: {from, to}});
    } else {
      let from:moment.Moment = date;
      let to:moment.Moment   = date;
      let max:moment.Moment  = this.getMaxDateFromShifts(shifts);
      let min:moment.Moment  = this.getMinDateFromShifts(shifts);
      if (date < min || max < date) {
        if (date < min) to = min;
        if (date > max) from = max;
        this.actions.next({type: Actions.Shift.LOAD, payload: {from, to}});
      } else {
        this.actions.next({type: Actions.Shift.LOAD, payload: {}});
      }
    }
  }

  private getMaxDateFromShifts(shifts: Model.Shift[]): any {
    let dates = _.map(shifts, 'startTime');
    return _.max(dates);
  }

  private getMinDateFromShifts(shifts: Model.Shift[]): any {
    let dates = _.map(shifts, 'startTime');
    return _.min(dates);
  }

  private _load(params?: any): Observable<Action> {
    return this.api.getAll(params.from, params.to)
      .do(payload => this.store.dispatch({type: Actions.Shift.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
