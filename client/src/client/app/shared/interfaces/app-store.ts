import { Employee, ShiftTemplate, Shift } from '../models/index';

export interface AppStore {
  employees: Employee[];
  shiftTemplates: ShiftTemplate[];
  shifts: Shift[];
}
