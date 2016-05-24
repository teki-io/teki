import { Model } from '../index';

export interface IShifts {
  shifts: Model.Admin.Shift[];
  creating: boolean;
  loading: boolean;
  selected: Model.Admin.Shift;
}
