import { Action, Reducer } from '@ngrx/store';
import * as Actions        from '../actions/index';
import * as Interface      from '../interfaces/index';

var initialState: Interface.IShifts = {
  shifts: [],
  creating: false,
  loading: false,
  selected: null
};

export const Shift: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Shift.LOADING:
      return Object.assign({}, state, { loading: true });
    case Actions.Shift.LOADED:
      return Object.assign({}, state, { shifts: [...state.shifts, ...action.payload], loading: false });
    default:
      return state;
  }
};
