import { Injectable, Inject } from '@angular/core';
import * as Api               from '../api/index';
import * as Actions           from '../actions/index';
import * as Interface         from '../interfaces/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { BehaviorSubject }    from 'rxjs/Rx';

import 'rxjs/add/operator/map';
const toastr = require('toastr');

@Injectable()
export class Auth {
  loggedIn: Observable<boolean>;
  loading: Observable<boolean>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Auth) private api: Api.Auth,
              private store: Store<Interface.AppStore>) {

    const store$ = store.select<Interface.IAuth>('auth');
    this.loggedIn = store$.map(({loggedIn}: Interface.IAuth) => loggedIn);
    this.loading  = store$.map(({loading}: Interface.IAuth) => loading);

    let login = this.actions
      .filter(({type}: Action) => type === Actions.Auth.LOGIN)
      .do(() => this.store.dispatch({type: Actions.Auth.LOGGININ}))
      .mergeMap(({payload}: Action) => this._login(payload));

    let signup = this.actions
      .filter(({type}: Action) => type === Actions.Auth.SIGNUP)
      .do(() => this.store.dispatch({type: Actions.Auth.SIGNINGUP}))
      .mergeMap(({payload}: Action) => this._signup(payload));

    Observable
      .merge(login, signup)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  login(email: any, password: any) {
    this.actions.next({type: Actions.Auth.LOGIN, payload: { email, password }});
  }

  signup(email: any, password: any) {
    this.actions.next({type: Actions.Auth.SIGNUP, payload: { email, password }});
  }

  logout(): void {
    this.actions.next({type: Actions.Auth.LOGGEDOUT});
  }

  get isSignedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  private _login(user: any): Observable<Action> {
    return this.api.login(user.email, user.password)
      .do((resp) => this.store.dispatch({type: Actions.Auth.LOGGEDIN, payload: resp}))
      .catch((error: any) => {
        if (error && error.status === 401) {
          toastr.error('Email or password is wrong.');
        }
        return Observable.throw('Server error');
      });
  }

  private _signup(user: any): Observable<Action> {
    return this.api.signup(user.email, user.password)
      .do((resp) => this.store.dispatch({type: Actions.Auth.SIGNINGUP, payload: resp}))
      .catch((error: any) => {
        toastr.error(error.text());
        return Observable.throw('Server error');
      });
  }
}
