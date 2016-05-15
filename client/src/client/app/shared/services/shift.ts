import { Injectable, Inject } from '@angular/core';
import { Shift }              from '../models/index';
import { ShiftAction }        from '../actions/index';
import { AppStore, IShifts }  from '../interfaces/index';
import { ApiShift }           from '../api/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from './index';
import { BehaviorSubject }    from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Injectable()
export class ShiftService {
  loading: Observable<boolean>;
  shifts: Observable<Shift[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(ApiShift) public api: ApiShift,
              private store: Store<AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<IShifts>('shifts');
    this.shifts = store$.map(({shifts}: IShifts) => shifts);
    this.loading  = store$.map(({loading}: IShifts) => loading);

    let loadShifts = this.actions
      .filter(({type}: Action) => type === ShiftAction.LOAD)
      .do(() => this.store.dispatch({type: ShiftAction.LOADING}))
      .mergeMap(({payload}: Action) => this._load(payload));

    let updateShift = this.actions
      .filter(({type}: Action) => type === ShiftAction.UPDATE)
      .do(() => this.store.dispatch({type: ShiftAction.UPDATING}))
      .mergeMap(({payload}: Action) => this._update(payload));

    let createShift = this.actions
      .filter(({type}: Action) => type === ShiftAction.CREATE)
      .do(() => this.store.dispatch({type: ShiftAction.CREATING}))
      .mergeMap(({payload}: Action) => this._create(payload));

    let destroyShift = this.actions
      .filter(({type}: Action) => type === ShiftAction.DELETE)
      .do(() => this.store.dispatch({type: ShiftAction.DELETING}))
      .mergeMap(({payload}: Action) => this._destroy(payload));

    Observable
      .merge(loadShifts, updateShift, createShift, destroyShift)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load(currentDate: moment.Moment = moment()) {
    let from = currentDate.clone().startOf('month').startOf('week');
    let to = currentDate.clone().add(1, 'months');
    this.actions.next({type: ShiftAction.LOAD, payload: {from, to}});
  }

  fetch(date: moment.Moment) {
    let shifts = this.store.value.shifts.shifts;
    let from:moment.Moment = date;
    let to:moment.Moment   = date;
    let max:moment.Moment  = this.getMaxDateFromShifts(shifts);
    let min:moment.Moment  = this.getMinDateFromShifts(shifts);
    if (date < min || max < date) {
      if (date < min) to = min;
      if (date > max) from = max;
      this.actions.next({type: ShiftAction.LOAD, payload: {from, to}});
    }
  }

  create(shift: Shift) {
    this.actions.next({type: ShiftAction.CREATE, payload: shift});
  }

  update(shift: Shift) {
    this.actions.next({type: ShiftAction.UPDATE, payload: shift});
  }

  destroy(shift: Shift) {
    this.actions.next({type: ShiftAction.DELETE, payload: shift});
  }

  private getMaxDateFromShifts(shifts: Shift[]): any {
    let dates = _.map(shifts, 'startTime');
    return _.max(dates);
  }

  private getMinDateFromShifts(shifts: Shift[]): any {
    let dates = _.map(shifts, 'startTime');
    return _.min(dates);
  }

  private _load(params?: any): Observable<Action> {
    return this.api.getAll(params.from, params.to)
      .do(payload => this.store.dispatch({type: ShiftAction.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _create(shift: Shift) {
    return this.api.create(shift)
      .do(payload => this.store.dispatch({ type: ShiftAction.CREATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _update(shift: Shift): Observable<Action> {
    return this.api.update(shift)
      .do(payload => this.store.dispatch({ type: ShiftAction.UPDATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _destroy(shift: Shift): Observable<Action> {
    return this.api.destroy(shift)
      .do(payload => this.store.dispatch({ type: ShiftAction.DELETED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
