import { ShiftTemplate } from '../models/index';
import { ShiftTemplateAction } from '../actions/index';

export const shiftTemplateReducer = (state: any = [], { type, payload }) => {
  switch (type) {
    case ShiftTemplateAction.ADD:
      return payload;
    case ShiftTemplateAction.CREATE:
      return [...state, payload];
    case ShiftTemplateAction.UPDATE:
      return state.map((item:ShiftTemplate) => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case ShiftTemplateAction.DELETE:
      return state.filter((item:ShiftTemplate) => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};
