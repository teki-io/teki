import { ShiftTemplate } from '../models/index';

export interface IShiftTemplates {
  shiftTemplates: ShiftTemplate[];
  creating: boolean;
  loading: boolean;
}
