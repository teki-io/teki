import { Action, Reducer } from '@ngrx/store';
import * as Model          from '../../models/index';
import * as Actions        from '../../actions/index';
import { IShifts }         from '../../interfaces/index';

var initialState: IShifts = {
  shifts: [],
  creating: false,
  loading: false,
  selected: null
};

export const Shift: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Admin.Shift.EDITING:
      return Object.assign({}, state, { selected: action.payload });
    case Actions.Admin.Shift.LOADING:
      return Object.assign({}, state, { loading: true });
    case Actions.Admin.Shift.LOADED:
      return Object.assign({}, state, { shifts: [...state.shifts, ...action.payload], loading: false });
    case Actions.Admin.Shift.CREATING:
      return Object.assign({}, state, { creating: true });
    case Actions.Admin.Shift.CREATED:
      return Object.assign({}, state, { shifts: [...state.shifts, action.payload], creating: false });
    case Actions.Admin.Shift.UPDATING:
      return state;
    case Actions.Admin.Shift.UPDATED:
      return Object.assign({}, state, { shifts: state.shifts.map((item:Model.Admin.Shift) => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      })});
    case Actions.Admin.Shift.DELETING:
      return state;
    case Actions.Admin.Shift.DELETED:
      return Object.assign({}, state, { shifts: state.shifts.filter((item:Model.Admin.Shift) => {
        return item.id !== action.payload.id;
      })});
    default:
      return state;
  }
};
