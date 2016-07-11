import { Action, Reducer } from '@ngrx/store';
import * as Actions        from '../actions/index';
import * as Interface      from '../interfaces/index';

var initialState: Interface.INotifications = {
  notifications: [],
  loading: false
};

export const Notification: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Notification.LOADING:
      return Object.assign({}, state, { loading: true });
    case Actions.Notification.LOADED:
      return Object.assign({}, state, { notifications: action.payload, loading: false });
    case Actions.Notification.UPDATING:
      return Object.assign({}, state, { loading: true });
    case Actions.Notification.UPDATED:
      return Object.assign({}, state, { loading: false });
    case Actions.Notification.ADDED:
      return Object.assign({}, state, { notifications: [...action.payload, ...state.notifications] });
    case Actions.Notification.UPDATINGALL:
      return Object.assign({}, state, { loading: true });
    case Actions.Notification.UPDATEDALL:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
};
