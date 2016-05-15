import { Shift } from '../models/index';

export interface IShifts {
  shifts: Shift[];
  creating: boolean;
  loading: boolean;
}
