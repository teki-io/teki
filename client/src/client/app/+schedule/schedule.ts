import {
  BaseComponent,
  PrivatePage,
  Model
} from '../shared/index';
import { Header }             from './components/header/index';
import { Widget }             from '../components/widget/index';
import { WidgetBody }         from '../components/widget-body/index';
import { AppLayoutComponent } from '../components/app-layout/index';
import { Calendar }           from './components/calendar/index';
import * as moment from 'moment';
import { Observable }       from 'rxjs/Observable';

@BaseComponent({
  selector: 'schedule',
  templateUrl: 'app/+schedule/schedule.html',
  styleUrls: ['app/+schedule/schedule.css'],
  directives: [Header, AppLayoutComponent, Widget, WidgetBody, Calendar]
})

@PrivatePage()
export class ScheduleComponent {
  currentDate: moment.Moment;
  calendarMode: Number;
  shifts: Observable<Model.Shift[]>;

  ngOnInit() {
    this.currentDate = moment();
    this.calendarMode = 3;
  }

  onDateChanged(newDate: moment.Moment) {
    this.currentDate = newDate;
  }

  onModeChanged(newMode: Number) {
    this.calendarMode = newMode;
    switch (this.calendarMode) {
      case 1:
        this.currentDate = this.currentDate.clone().startOf('month');
        break;
      case 2:
        this.currentDate = this.currentDate.clone().startOf('week');
        break;
      case 3:
        let firstMonthDiff = moment().diff(this.currentDate.startOf('week'), 'months');
        let secondMonthDiff = moment().diff(this.currentDate.endOf('week'), 'months');
        if (firstMonthDiff !== secondMonthDiff) {
          if (firstMonthDiff < secondMonthDiff && firstMonthDiff >= 0) {
            this.currentDate = moment().add(firstMonthDiff, 'months');
          } else {
            this.currentDate = moment().add(secondMonthDiff, 'months');
          }
        } else {
          this.currentDate = this.currentDate.clone().startOf('month');
        }
        break;
      default:
        this.currentDate = this.currentDate.clone().startOf('month');
        break;
    }
  }
}
