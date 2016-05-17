import { BaseComponent } from '../../../../shared/index';
import { Input, OnChanges } from '@angular/core';

@BaseComponent({
  selector: 'headers',
  templateUrl: 'app/+scheduler/components/calendar/headers/headers.html',
  styleUrls: ['app/+scheduler/components/calendar/headers/headers.css']
})
export class Headers implements OnChanges {
  @Input() width: number;
  dailyWidth: number;

  ngOnChanges(changes: any) {
    if (changes.width) {
      this.dailyWidth = this.width / 7;
    }
  }
}
