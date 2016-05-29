import { Action, Reducer } from '@ngrx/store';
import * as Model          from '../../models/index';
import * as Actions        from '../../actions/index';
import { IEmployees }      from '../../interfaces/index';

var initialState: IEmployees = {
  employees: [],
  creating: false,
  loading: false
};

export const Employee: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.Admin.Employee.LOADING:
      return Object.assign({}, state, { loading: true });
    case Actions.Admin.Employee.LOADED:
      return Object.assign({}, state, { employees: action.payload, loading: false });
    case Actions.Admin.Employee.CREATING:
      return Object.assign({}, state, { creating: true });
    case Actions.Admin.Employee.CREATED:
      return Object.assign({}, state, { employees: [...state.employees, action.payload] });
    case Actions.Admin.Employee.UPDATING:
      return state;
    case Actions.Admin.Employee.UPDATED:
      return Object.assign({}, state, { employees: state.employees.map((item:Model.Admin.Employee) => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      })});
    case Actions.Admin.Employee.DELETING:
      return state;
    case Actions.Admin.Employee.DELETED:
      return Object.assign({}, state, { employees: state.employees.filter((item:Model.Admin.Employee) => {
        return item.id !== action.payload.id;
      })});
    default:
      return state;
  }
};
