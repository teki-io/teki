import { BaseComponent }  from '../shared/core/index';
import { Calendar } from './components/calendar/index';
import { Header } from './components/header/index';
import * as moment from 'moment/moment';

@BaseComponent({
  selector: 'teki-scheduler',
  templateUrl: 'app/+scheduler/schedular.html',
  styleUrls: ['app/+scheduler/schedular.css'],
  directives: [Calendar, Header]
})

export class SchedulerComponent {
  currentDate: moment.Moment;
  calendarMode: Number;

  ngOnInit() {
    this.currentDate = moment();
    this.calendarMode = 2;
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
