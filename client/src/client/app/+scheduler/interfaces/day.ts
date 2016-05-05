import * as moment from 'moment';
import { Shift } from '../../shared/index';

export interface IDay {
  date:    moment.Moment;
  shifts:  Array<Shift>;
}
