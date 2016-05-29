import { Model } from '../index';

export interface AppStore {
  employees: Model.Admin.Employee[];
  shiftTemplates: Model.Admin.ShiftTemplate[];
  shifts: Model.Admin.Shift[];
}
