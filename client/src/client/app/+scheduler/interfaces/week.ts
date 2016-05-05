import * as moment from 'moment';
import { Shift } from '../../shared/index';
import { IDay } from './index';

export interface IWeek {
  date:    moment.Moment;
  shifts:  Array<Shift>;
  days:    Array<IDay>;
}
