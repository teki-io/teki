import { Action, Reducer } from '@ngrx/store';
import * as Actions        from '../../actions/index';
import * as Interface      from '../../interfaces/index';

var initialState: Interface.Admin.ICompanies = {
  updating_shift_templates: false
};

export const Company: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Admin.Company.UPDATING_TEMPLATES_ORDER:
      return Object.assign({}, state, { updating_shift_templates: true });
    case Actions.Admin.Company.UPDATED_TEMPLATES_ORDER:
      return Object.assign({}, state, { updating_shift_templates: false });
    default:
      return state;
  }
};
