import * as moment from 'moment';
import { Shift } from '../../shared/index';
import { IWeek } from './index';

export interface IMonth {
  date:    moment.Moment;
  shifts:  Array<Shift>;
  weeks:    Array<IWeek>;
}
