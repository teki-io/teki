import * as moment from 'moment';
import { Model } from '../../shared/index';
import { IDay } from './index';

export interface IWeek {
  date:    moment.Moment;
  shifts:  Model.Admin.Shift[];
  days:    IDay[];
}
