import { Injectable, Inject } from '@angular/core';
import * as Api               from '../../api/index';
import * as Model             from '../../models/index';
import * as Actions           from '../../actions/index';
import * as Interface         from '../../interfaces/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from '../index';
import { BehaviorSubject }    from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class ShiftTemplate {
  loading: Observable<boolean>;
  shiftTemplates: Observable<Model.Admin.ShiftTemplate[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Admin.ShiftTemplate) public api: Api.Admin.ShiftTemplate,
              private store: Store<Interface.AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<Interface.Admin.IShiftTemplates>('admin.shiftTemplates');
    this.shiftTemplates = store$.map(({shiftTemplates}: Interface.Admin.IShiftTemplates) => shiftTemplates);
    this.loading  = store$.map(({loading}: Interface.Admin.IShiftTemplates) => loading);


    let loadShiftTemplates = this.actions
      .filter(({type}: Action) => type === Actions.Admin.ShiftTemplate.LOAD)
      .do(() => this.store.dispatch({type: Actions.Admin.ShiftTemplate.LOADING}))
      .mergeMap(() => this._load());

    let updateShiftTemplate = this.actions
      .filter(({type}: Action) => type === Actions.Admin.ShiftTemplate.UPDATE)
      .do(() => this.store.dispatch({type: Actions.Admin.ShiftTemplate.UPDATING}))
      .mergeMap(({payload}: Action) => this._update(payload));

    let createShiftTemplate = this.actions
      .filter(({type}: Action) => type === Actions.Admin.ShiftTemplate.CREATE)
      .do(() => this.store.dispatch({type: Actions.Admin.ShiftTemplate.CREATING}))
      .mergeMap(({payload}: Action) => this._create(payload));

    let destroyShiftTemplate = this.actions
      .filter(({type}: Action) => type === Actions.Admin.ShiftTemplate.DELETE)
      .do(() => this.store.dispatch({type: Actions.Admin.ShiftTemplate.DELETING}))
      .mergeMap(({payload}: Action) => this._destroy(payload));

    Observable
      .merge(loadShiftTemplates, updateShiftTemplate, createShiftTemplate, destroyShiftTemplate)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load() {
    this.actions.next({type: Actions.Admin.ShiftTemplate.LOAD});
  }

  create(shiftTemplate: Model.Admin.ShiftTemplate) {
    this.actions.next({type: Actions.Admin.ShiftTemplate.CREATE, payload: shiftTemplate});
  }

  update(shiftTemplate: Model.Admin.ShiftTemplate) {
    this.actions.next({type: Actions.Admin.ShiftTemplate.UPDATE, payload: shiftTemplate});
  }

  destroy(shiftTemplate: Model.Admin.ShiftTemplate) {
    this.actions.next({type: Actions.Admin.ShiftTemplate.DELETE, payload: shiftTemplate});
  }

  private _load(): Observable<Action> {
    return this.api.getAll()
      .do(payload => this.store.dispatch({type: Actions.Admin.ShiftTemplate.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _create(shiftTemplate: Model.Admin.ShiftTemplate) {
    return this.api.create(shiftTemplate)
      .do(payload => this.store.dispatch(({ type: Actions.Admin.ShiftTemplate.CREATED, payload })))
      .catch(error => this.errorHandler.handle(error));
  }

  private _update(shiftTemplate: Model.Admin.ShiftTemplate): Observable<Action> {
    return this.api.update(shiftTemplate)
      .do(payload => this.store.dispatch(({ type: Actions.Admin.ShiftTemplate.UPDATED, payload })))
      .catch(error => this.errorHandler.handle(error));
  }

  private _destroy(shiftTemplate: Model.Admin.ShiftTemplate): Observable<Action> {
    return this.api.destroy(shiftTemplate)
      .do(payload => this.store.dispatch(({ type: Actions.Admin.ShiftTemplate.DELETED, payload })))
      .catch(error => this.errorHandler.handle(error));
  }
}
