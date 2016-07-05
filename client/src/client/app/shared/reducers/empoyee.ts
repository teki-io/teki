import { Action, Reducer } from '@ngrx/store';
import * as Actions        from '../actions/index';
import * as Interface      from '../interfaces/index';

var initialState: Interface.IEmployees = {
  employees: [],
  loading: false
};

export const Employee: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Employee.LOADING:
      return Object.assign({}, state, { loading: true });
    case Actions.Employee.LOADED:
      return Object.assign({}, state, { employees: action.payload, loading: false });
    default:
      return state;
  }
};
