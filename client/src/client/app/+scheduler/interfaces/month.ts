import * as moment from 'moment';
import { Model } from '../../shared/index';
import { IWeek } from './index';

export interface IMonth {
  date:    moment.Moment;
  shifts:  Array<Model.Admin.Shift>;
  weeks:    Array<IWeek>;
}
