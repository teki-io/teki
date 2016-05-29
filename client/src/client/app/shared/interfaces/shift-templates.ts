import { Model } from '../index';

export interface IShiftTemplates {
  shiftTemplates: Model.Admin.ShiftTemplate[];
  creating: boolean;
  loading: boolean;
}
