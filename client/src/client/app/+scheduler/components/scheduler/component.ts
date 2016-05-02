import {BaseComponent}  from '../../../shared/core/index';
import {Calendar} from '../calendar/component';
import * as moment from 'moment';

@BaseComponent({
  selector: 'teki-scheduler',
  templateUrl: 'app/+scheduler/components/scheduler/component.html',
  styleUrls: ['app/+scheduler/components/scheduler/component.css'],
  directives: [Calendar]
})

export class SchedulerComponent {}
