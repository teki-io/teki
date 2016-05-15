import { Injectable, Inject }        from '@angular/core';
import { ShiftTemplate }             from '../models/index';
import { ShiftTemplateAction }       from '../actions/index';
import { AppStore, IShiftTemplates } from '../interfaces/index';
import { ApiShiftTemplate }          from '../api/index';
import { Observable }                from 'rxjs/Observable';
import { Store, Action }             from '@ngrx/store';
import { HttpErrorHandler }          from './index';
import { BehaviorSubject }           from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class ShiftTemplateService {
  loading: Observable<boolean>;
  shiftTemplates: Observable<ShiftTemplate[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(ApiShiftTemplate) public api: ApiShiftTemplate,
              private store: Store<AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<IShiftTemplates>('shiftTemplates');
    this.shiftTemplates = store$.map(({shiftTemplates}: IShiftTemplates) => shiftTemplates);
    this.loading  = store$.map(({loading}: IShiftTemplates) => loading);


    let loadShiftTemplates = this.actions
      .filter(({type}: Action) => type === ShiftTemplateAction.LOAD)
      .do(() => this.store.dispatch({type: ShiftTemplateAction.LOADING}))
      .mergeMap(() => this._load());

    let updateShiftTemplate = this.actions
      .filter(({type}: Action) => type === ShiftTemplateAction.UPDATE)
      .do(() => this.store.dispatch({type: ShiftTemplateAction.UPDATING}))
      .mergeMap(({payload}: Action) => this._update(payload));

    let createShiftTemplate = this.actions
      .filter(({type}: Action) => type === ShiftTemplateAction.CREATE)
      .do(() => this.store.dispatch({type: ShiftTemplateAction.CREATING}))
      .mergeMap(({payload}: Action) => this._create(payload));

    let destroyShiftTemplate = this.actions
      .filter(({type}: Action) => type === ShiftTemplateAction.DELETE)
      .do(() => this.store.dispatch({type: ShiftTemplateAction.DELETING}))
      .mergeMap(({payload}: Action) => this._destroy(payload));

    Observable
      .merge(loadShiftTemplates, updateShiftTemplate, createShiftTemplate, destroyShiftTemplate)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load() {
    this.actions.next({type: ShiftTemplateAction.LOAD});
  }

  create(shiftTemplate: ShiftTemplate) {
    this.actions.next({type: ShiftTemplateAction.CREATE, payload: shiftTemplate});
  }

  update(shiftTemplate: ShiftTemplate) {
    this.actions.next({type: ShiftTemplateAction.UPDATE, payload: shiftTemplate});
  }

  destroy(shiftTemplate: ShiftTemplate) {
    this.actions.next({type: ShiftTemplateAction.DELETE, payload: shiftTemplate});
  }

  private _load(): Observable<Action> {
    return this.api.getAll()
      .do(payload => this.store.dispatch({type: ShiftTemplateAction.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _create(shiftTemplate: ShiftTemplate) {
    return this.api.create(shiftTemplate)
      .map(payload => ({ type: ShiftTemplateAction.CREATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _update(shiftTemplate: ShiftTemplate): Observable<Action> {
    return this.api.update(shiftTemplate)
      .map(payload => ({ type: ShiftTemplateAction.UPDATED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }

  private _destroy(shiftTemplate: ShiftTemplate): Observable<Action> {
    return this.api.destroy(shiftTemplate)
      .map(payload => ({ type: ShiftTemplateAction.DELETED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
