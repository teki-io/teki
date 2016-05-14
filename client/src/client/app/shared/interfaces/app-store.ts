import { Employee, ShiftTemplate } from '../models/index';

export interface AppStore {
  employees: Employee[];
  shiftTemplates: ShiftTemplate[];
}
