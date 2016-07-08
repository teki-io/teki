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
export class Notification {
  loading: Observable<boolean>;
  notifications: Observable<Model.Notification[]>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Notification) private api: Api.Notification,
              private store: Store<Interface.AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<Interface.INotifications>('notifications');
    this.notifications = store$.map(({notifications}: Interface.INotifications) => notifications);
    this.loading  = store$.map(({loading}: Interface.INotifications) => loading);

    let loadNotifications = this.actions
      .filter(({type}: Action) => type === Actions.Notification.LOAD)
      .do(() => this.store.dispatch({type: Actions.Notification.LOADING}))
      .mergeMap(() => this._load());

    Observable
      .merge(loadNotifications)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load() {
    this.actions.next({type: Actions.Notification.LOAD});
  }

  private _load(): Observable<Action> {
    return this.api.getAll()
      .do(payload => this.store.dispatch({type: Actions.Notification.LOADED, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
