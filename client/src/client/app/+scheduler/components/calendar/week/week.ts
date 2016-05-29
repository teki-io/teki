import { Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { BaseComponent, Model } from '../../../../shared/index';
import { IWeek } from '../../../interfaces/index';
import { WeekDay } from '../week-day/index';
import { WeeklyHoursCalculator } from '../../../services/index';
import { Action, Dispatcher } from '@ngrx/store';
import * as Actions from '../../../../shared/actions/index';
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
  @Input() shifts:  Array<Model.Admin.Shift>;
  @Input() currentDate:    moment.Moment;
  @Input() showAll: boolean;
  @Input() shiftTemplates: Array<Model.Admin.ShiftTemplate>;
  @Input() employees: Array<Model.Admin.Employee>;
  @Input() width: number;
  dailyWidth: number;
  private addSub:any = null;
  private updateSub:any = null;

  constructor(
    private calculatorService: WeeklyHoursCalculator,
    private dispatcher: Dispatcher<Action>,
    private weekHelper: WeekHelper) {
    this.addSub = dispatcher
      .filter(({type}: Action) => type === Actions.Admin.Shift.CREATED)
      .subscribe(({payload}: Action) => this.onShiftAdded(payload));

    this.updateSub = dispatcher
      .filter(({type}: Action) => type === Actions.Admin.Shift.UPDATED)
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

  private onShiftUpdated(shift: Model.Admin.Shift) {
    this.calculatorService.updateShift(shift);
  }

  private onShiftAdded(shift: Model.Admin.Shift) {
    this.calculatorService.addShift(shift);
  }
}
