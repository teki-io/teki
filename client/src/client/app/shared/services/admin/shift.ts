import { Injectable, Inject } from '@angular/core';
import * as Api               from '../../api/index';
import * as Model             from '../../models/index';
import * as Actions           from '../../actions/index';
import { AppStore, IShifts }  from '../../interfaces/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from './../index';
import { BehaviorSubject }    from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Injectable()
export class Shift {
  loading: Observable<boolean>;
  shifts: Observable<Model.Admin.Shift[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Admin.Shift) private api: Api.Admin.Shift,
              private store: Store<AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<IShifts>('shifts');
    this.shifts = store$.map(({shifts}: IShifts) => shifts);
    this.loading  = store$.map(({loading}: IShifts) => loading);

    let loadShifts = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Shift.LOAD)
      .do(() => this.store.dispatch({type: Actions.Admin.Shift.LOADING}))
      .mergeMap(({payload}: Action) => this._load(payload));

    let updateShift = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Shift.UPDATE)
      .do(() => this.store.dispatch({type: Actions.Admin.Shift.UPDATING}))
      .mergeMap(({payload}: Action) => this._update(payload));

    let createShift = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Shift.CREATE)
      .do(() => this.store.dispatch({type: Actions.Admin.Shift.CREATING}))
      .mergeMap(({payload}: Action) => this._create(payload));

    let destroyShift = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Shift.DELETE)
      .do(() => this.store.dispatch({type: Actions.Admin.Shift.DELETING}))
      .mergeMap(({payload}: Action) => this._destroy(payload));

    Observable
      .merge(loadShifts, updateShift, createShift, destroyShift)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load(currentDate: moment.Moment = moment()) {
    let from = currentDate.clone().startOf('month').startOf('week');
    let to = currentDate.clone().add(1, 'months');
    this.actions.next({type: Actions.Admin.Shift.LOAD, payload: {from, to}});
  }

  fetch(date: moment.Moment) {
    let shifts = <Model.Admin.Shift[]>this.store.value.shifts.shifts;
    let from:moment.Moment = date;
    let to:moment.Moment   = date;
    let max:moment.Moment  = this.getMaxDateFromShifts(shifts);
    let min:moment.Moment  = this.getMinDateFromShifts(shifts);
    if (date < min || max < date) {
      if (date < min) to = min;
      if (date > max) from = max;
      this.actions.next({type: Actions.Admin.Shift.LOAD, payload: {from, to}});
    }
  }

  create(shift: Model.Admin.Shift) {
    this.actions.next({type: Actions.Admin.Shift.CREATE, payload: shift});
  }

  update(shift: Model.Admin.Shift) {
    this.actions.next({type: Actions.Admin.Shift.UPDATE, payload: shift});
  }

  destroy(shift: Model.Admin.Shift) {
    this.actions.next({type: Actions.Admin.Shift.DELETE, payload: shift});
  }

  editing(shift: Model.Admin.Shift) {
    this.store.dispatch({type: Actions.Admin.Shift.EDITING, payload: shift});
  }

  private getMaxDateFromShifts(shifts: Model.Admin.Shift[]): any {
    let dates = _.map(shifts, 'startTime');
    return _.max(dates);
  }

  private getMinDateFromShifts(shifts: Model.Admin.Shift[]): any {
    let dates = _.map(shifts, 'startTime');
    return _.min(dates);
  }

  private _load(params?: any): Observable<Action> {
    return this.api.getAll(params.from, params.to)
      .do(payload => this.store.dispatch({type: Actions.Admin.Shift.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _create(shift: Model.Admin.Shift) {
    return this.api.create(shift)
      .do(payload => this.store.dispatch({ type: Actions.Admin.Shift.CREATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _update(shift: Model.Admin.Shift): Observable<Action> {
    return this.api.update(shift)
      .do(payload => this.store.dispatch({ type: Actions.Admin.Shift.UPDATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _destroy(shift: Model.Admin.Shift): Observable<Action> {
    return this.api.destroy(shift)
      .do(payload => this.store.dispatch({ type: Actions.Admin.Shift.DELETED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
