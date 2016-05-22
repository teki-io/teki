import { Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import {
  BaseComponent,
  Shift,
  ShiftTemplate,
  Employee
} from '../../../../shared/index';
import { IWeek } from '../../../interfaces/index';
import { WeekDay } from '../week-day/index';
import { WeeklyHoursCalculator } from '../../../services/index';
import { Action, Dispatcher } from '@ngrx/store';
import { ShiftAction } from '../../../../shared/index';
import { WeekHelper } from './services/index';

@BaseComponent({
  selector: 'week',
  templateUrl: 'app/+scheduler/components/calendar/week/week.html',
  styleUrls: ['app/+scheduler/components/calendar/week/week.css'],
  bindings: [WeeklyHoursCalculator],
  directives: [WeekDay],
  providers: [WeekHelper]
})

export class Week implements OnChanges {
  @Input() week:    IWeek;
  @Input() shifts:  Array<Shift>;
  @Input() currentDate:    moment.Moment;
  @Input() showAll: boolean;
  @Input() shiftTemplates: Array<ShiftTemplate>;
  @Input() employees: Array<Employee>;
  @Input() width: number;
  dailyWidth: number;
  private addSub:any = null;
  private updateSub:any = null;

  constructor(
    private calculatorService: WeeklyHoursCalculator,
    private dispatcher: Dispatcher<Action>,
    private weekHelper: WeekHelper) {
    this.addSub = dispatcher
      .filter(({type}: Action) => type === ShiftAction.CREATED)
      .subscribe(({payload}: Action) => this.onShiftAdded(payload));

    this.updateSub = dispatcher
      .filter(({type}: Action) => type === ShiftAction.UPDATED)
      .subscribe(({payload}: Action) => this.onShiftUpdated(payload));
  }

  ngOnInit() {
    this.initializeWeek();
  }

  ngOnChanges(changes: any) {
    if (changes.currentDate) {
      this.week = this.weekHelper.newWeek(this.currentDate);
      this.week = this.weekHelper.getWeekWithShifts(this.week, this.shifts);
    }
    if (changes.width) {
      this.dailyWidth = this.width / 7;
    }
  }

  ngOnDestroy() {
    this.addSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.calculatorService.clear();
    this.calculatorService = null;
  }

  initializeWeek() {
    this.week = this.week || this.weekHelper.newWeek(this.currentDate);
    this.week = this.weekHelper.getWeekWithShifts(this.week, this.shifts);
    this.calculatorService.init(this.employees, this.week);
  }

  private onShiftUpdated(shift: Shift) {
    this.calculatorService.updateShift(shift);
  }

  private onShiftAdded(shift: Shift) {
    this.calculatorService.addShift(shift);
  }
}
