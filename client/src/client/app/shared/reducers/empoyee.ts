import { Employee } from '../models/employee';
import { EmployeeAction } from '../actions/index';

export const employeeReducer = (state: any = [], { type, payload }) => {
  switch (type) {
    case EmployeeAction.ADD:
      return payload;
    case EmployeeAction.CREATE:
      return [...state, payload];
    case EmployeeAction.UPDATE:
      return state.map((item:Employee) => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case EmployeeAction.DELETE:
      return state.filter((item:Employee) => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};
