import { Model } from '../index';

export interface AppStore {
  'admin.employees': Model.Admin.Employee[];
  'admin.shiftTemplates': Model.Admin.ShiftTemplate[];
  'admin.shifts': Model.Admin.Shift[];
}
