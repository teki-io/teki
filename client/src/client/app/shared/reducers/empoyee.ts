import { Action, Reducer } from '@ngrx/store';
import { Employee }        from '../models/employee';
import { EmployeeAction }  from '../actions/index';
import { IEmployees }      from '../interfaces/index';

var initialState: IEmployees = {
  employees: [],
  creating: false,
  loading: false
};

export const employeeReducer: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case EmployeeAction.LOADING:
      return Object.assign({}, state, { loading: true });
    case EmployeeAction.LOADED:
      return Object.assign({}, state, { employees: action.payload });
    case EmployeeAction.CREATING:
      return Object.assign({}, state, { creating: true });
    case EmployeeAction.CREATED:
      return Object.assign({}, state, { employees: [...state.employees, action.payload] });
    case EmployeeAction.UPDATING:
      return Object.assign({}, state, { loading: true });
    case EmployeeAction.UPDATED:
      return Object.assign({}, state, { employees: state.employees.map((item:Employee) => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      })});
    case EmployeeAction.DELETING:
      return Object.assign({}, state, { loading: true });
    case EmployeeAction.DELETED:
      return Object.assign({}, state, { employees: state.employees.filter((item:Employee) => {
        return item.id !== action.payload.id;
      })});
    default:
      return state;
  }
};
