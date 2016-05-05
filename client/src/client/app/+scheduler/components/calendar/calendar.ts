import { Input } from 'angular2/core';
import { BaseComponent }  from '../../../shared/core/index';
import { ShiftService } from '../../../shared/services/index';
import { Shift } from '../../../shared/models/index';
import * as moment from 'moment';

@BaseComponent({
  selector: 'calendar',
  templateUrl: 'app/+scheduler/components/calendar/calendar.html'
})

export class Calendar {
  @Input() currentDate: moment.Moment;
  shifts: Array<Shift> = [];
  fetching: boolean = true;

  constructor(
    public shiftService: ShiftService
  ) {
    this.shiftService.getAll().subscribe((shifts: Shift[]) => this.onShiftsFetched(shifts));
  }

  ngOnInit() {
    this.shiftService.init(this.currentDate);
  }

  private onShiftsFetched(shifts: Shift[]) {
    this.shifts = shifts;
    this.fetching = false;
  }
}
