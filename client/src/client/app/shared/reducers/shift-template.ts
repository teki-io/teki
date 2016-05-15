import { Action, Reducer }      from '@ngrx/store';
import { ShiftTemplate }        from '../models/index';
import { ShiftTemplateAction }  from '../actions/index';
import { IShiftTemplates }      from '../interfaces/index';

var initialState: IShiftTemplates = {
  shiftTemplates: [],
  creating: false,
  loading: false
};

export const shiftTemplateReducer: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case ShiftTemplateAction.LOADING:
      return Object.assign({}, state, { loading: true });
    case ShiftTemplateAction.LOADED:
      return Object.assign({}, state, { shiftTemplates: action.payload });
    case ShiftTemplateAction.CREATING:
      return Object.assign({}, state, { creating: true });
    case ShiftTemplateAction.CREATED:
      return Object.assign({}, state, { shiftTemplates: [...state.shiftTemplates, action.payload] });
    case ShiftTemplateAction.UPDATING:
      return Object.assign({}, state, { loading: true });
    case ShiftTemplateAction.UPDATED:
      return Object.assign({}, state, { shiftTemplates: state.shiftTemplates.map((item:ShiftTemplate) => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      })});
    case ShiftTemplateAction.DELETING:
      return Object.assign({}, state, { loading: true });
    case ShiftTemplateAction.DELETED:
      return Object.assign({}, state, { shiftTemplates: state.shiftTemplates.filter((item:ShiftTemplate) => {
        return item.id !== action.payload.id;
      })});
    default:
      return state;
  }
};
