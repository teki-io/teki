import { Model } from '../index';

export interface IShifts {
  shifts: Model.Shift[];
  creating: boolean;
  loading: boolean;
  selected: Model.Shift;
}
