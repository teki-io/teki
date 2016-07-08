import { Action, Reducer } from '@ngrx/store';
import * as Actions        from '../actions/index';
import * as Interface      from '../interfaces/index';

var initialState: Interface.IAuth = {
  loading: false,
  loggedIn: false
};

export const Auth: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Auth.LOGGININ:
      return Object.assign({}, state, { loading: true });
    case Actions.Auth.LOGGEDIN:
      localStorage.setItem('jwt', action.payload.json().token);
      return Object.assign({}, state, { error: false, loggedIn: true, loading: false });
    case Actions.Auth.SIGNINGUP:
      return Object.assign({}, state, { loading: true });
    case Actions.Auth.SIGNEDUP:
      localStorage.setItem('jwt', action.payload.json().token);
      return Object.assign({}, state, { error: false, loggedIn: true, loading: false });
    case Actions.Auth.LOGGEDOUT:
      localStorage.removeItem('jwt');
      return Object.assign({}, state, { loggedIn: false });
    case Actions.Auth.ERROR:
      return Object.assign({}, state, { error: true, loggedIn: false, loading: false });
    default:
      return state;
  }
};
