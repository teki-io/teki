import { Action, Reducer } from '@ngrx/store';
import * as Actions        from '../actions/index';
import * as Interface      from '../interfaces/index';

var initialState: Interface.IProfile = {
  profile: null,
  loading: false
};

export const Profile: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Profile.LOADING:
      return Object.assign({}, state, { loading: true });
    case Actions.Profile.LOADED:
      return Object.assign({}, state, { profile: action.payload, loading: false });
    case Actions.Profile.ERROR:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
};
