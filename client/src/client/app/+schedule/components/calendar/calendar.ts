import { ChangeDetectionStrategy } from '@angular/core';
import { Input, OnChanges, ElementRef } from '@angular/core';
import { BaseComponent, Model } from '../../../shared/index';
import { Headers } from './headers/index';
import { Month } from './month/index';
import * as moment from 'moment';
import { Observable }       from 'rxjs/Observable';
import * as Service from '../../../shared/services/index';

@BaseComponent({
  selector: 'calendar',
  templateUrl: 'app/+schedule/components/calendar/calendar.html',
  styleUrls: ['app/+schedule/components/calendar/calendar.css'],
  directives: [Month, Headers],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Calendar implements OnChanges {
  @Input() currentDate: moment.Moment;
  @Input() calendarMode: Number;
  shifts: Observable<Model.Admin.Shift[]>;
  fetching: boolean = true;
  width: number;

  constructor(
    private shiftService: Service.Shift,
    private ref: ElementRef
  ) {
    this.shifts = this.shiftService.shifts;
  }

  ngOnInit() {
    this.shiftService.load(this.currentDate);
  }

  ngAfterViewInit() {
    let innerWidth = this.ref.nativeElement.getBoundingClientRect().width;
    this.width = innerWidth > 1000 ? innerWidth : 1000;
  }

  ngOnChanges(changes: any) {
    if (!_.isEmpty(changes.currentDate.previousValue) && changes.currentDate) {
      this.fetching = true;
      this.shiftService.fetch(this.currentDate);
    }
  }

  onResize(event: any) {
    if (event.target.innerWidth > 1000) {
      this.width = event.target.innerWidth;
    }
  }
}
