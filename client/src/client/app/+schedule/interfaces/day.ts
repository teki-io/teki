import * as moment from 'moment';
import { Model } from '../../shared/index';

export interface IDay {
  date:    moment.Moment;
  shifts:  Array<Model.Shift>;
}
