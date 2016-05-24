import { Action, Reducer }    from '@ngrx/store';
import * as Model             from '../../models/index';
import * as Actions           from '../../actions/index';
import { IShiftTemplates }    from '../../interfaces/index';

var initialState: IShiftTemplates = {
  shiftTemplates: [],
  creating: false,
  loading: false
};

export const ShiftTemplate: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Admin.ShiftTemplate.LOADING:
      return Object.assign({}, state, { loading: true });
    case Actions.Admin.ShiftTemplate.LOADED:
      return Object.assign({}, state, { shiftTemplates: action.payload, loading: false });
    case Actions.Admin.ShiftTemplate.CREATING:
      return Object.assign({}, state, { creating: true });
    case Actions.Admin.ShiftTemplate.CREATED:
      return Object.assign({}, state, { shiftTemplates: [...state.shiftTemplates, action.payload], creating: false });
    case Actions.Admin.ShiftTemplate.UPDATING:
      return state;
    case Actions.Admin.ShiftTemplate.UPDATED:
      return Object.assign({}, state, { shiftTemplates: state.shiftTemplates.map((item:Model.Admin.ShiftTemplate) => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      })});
    case Actions.Admin.ShiftTemplate.DELETING:
      return state;
    case Actions.Admin.ShiftTemplate.DELETED:
      return Object.assign({}, state, { shiftTemplates: state.shiftTemplates.filter((item:Model.Admin.ShiftTemplate) => {
        return item.id !== action.payload.id;
      })});
    default:
      return state;
  }
};
