import { Action, Reducer } from '@ngrx/store';
import { Shift }        from '../models/index';
import { ShiftAction }  from '../actions/index';
import { IShifts }      from '../interfaces/index';

var initialState: IShifts = {
  shifts: [],
  creating: false,
  loading: false,
  selected: null
};

export const shiftReducer: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case ShiftAction.EDITING:
      return Object.assign({}, state, { selected: action.payload });
    case ShiftAction.LOADING:
      return Object.assign({}, state, { loading: true });
    case ShiftAction.LOADED:
      return Object.assign({}, state, { shifts: [...state.shifts, ...action.payload], loading: false });
    case ShiftAction.CREATING:
      return Object.assign({}, state, { creating: true });
    case ShiftAction.CREATED:
      return Object.assign({}, state, { shifts: [...state.shifts, action.payload], creating: false });
    case ShiftAction.UPDATING:
      return state;
    case ShiftAction.UPDATED:
      return Object.assign({}, state, { shifts: state.shifts.map((item:Shift) => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      })});
    case ShiftAction.DELETING:
      return state;
    case ShiftAction.DELETED:
      return Object.assign({}, state, { shifts: state.shifts.filter((item:Shift) => {
        return item.id !== action.payload.id;
      })});
    default:
      return state;
  }
};
