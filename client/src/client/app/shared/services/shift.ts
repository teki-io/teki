import { EventEmitter, Injectable } from '@angular/core';
import { ApiShift } from '../api/index';
import { HttpErrorHandler, Operator } from './index';
import { Shift } from '../models/shift';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class ShiftService {
  public all: EventEmitter<Shift[]> = new EventEmitter<Shift[]>();
  public created: EventEmitter<Shift> = new EventEmitter<Shift>();
  public updated: EventEmitter<Shift> = new EventEmitter<Shift>();
  private shifts:  Shift[] = [];
  private initialized:  boolean = false;

  constructor(private api: ApiShift,
              private errorHandler: HttpErrorHandler) {}

  public init(currentDate: moment.Moment = moment()) {
    let from = currentDate.clone().startOf('month').startOf('week');
    let to = currentDate.clone().add(1, 'months');
    if (this.initialized) {
      this.all.emit(this.shifts);
    } else {
      this.api.getAll(from, to).subscribe(shifts => this.onShiftsFetched(shifts), e => this.errorHandler.handle(e));
    }
  }

  public clear() {
    this.shifts = [];
  }

  public getAll(): EventEmitter<Shift[]> {
    return this.all;
  }

  public fetch(date: moment.Moment) {
    let from:moment.Moment = date;
    let to:moment.Moment   = date;
    let max:moment.Moment  = this.getMaxDateFromShifts();
    let min:moment.Moment  = this.getMinDateFromShifts();
    if (date < min || max < date) {
      if (date < min) to = min;
      if (date > max) from = max;
      this.api.getAll(from, to).subscribe(shifts => this.onShiftsFetched(shifts), e => this.errorHandler.handle(e));
    } else {
      this.all.emit(this.shifts);
    }
  }

  public create(d: Shift): EventEmitter<Shift> {
    this.api.create(d)
      .subscribe((d: Shift) => {
        this.updateShift(d);
        this.created.emit(d);
      }, e => this.errorHandler.handle(e));
    return this.created;
  }

  public update(d: Shift): EventEmitter<Shift> {
    this.api.update(d)
      .subscribe((d: Shift) => {
        this.updateShift(d);
        this.updated.emit(d);
      }, e => this.errorHandler.handle(e));
    return this.updated;
  }

  public onShiftsFetched(shifts: Array<Shift>) {
    this.updateShifts(shifts);
    this.initialized = true;
    this.all.emit(this.shifts);
  }

  private updateShift(shift: Shift) {
    Operator.update(this.shifts, shift);
  }

  private updateShifts(shifts: Array<Shift>) {
    let _shifts = shifts.concat(this.shifts);
    this.shifts = _.uniqBy(_shifts, 'id');
  }

  private getMaxDateFromShifts(): any {
    let dates = _.map(this.shifts, 'startTime');
    return _.max(dates);
  }

  private getMinDateFromShifts(): any {
    let dates = _.map(this.shifts, 'startTime');
    return _.min(dates);
  }
}
