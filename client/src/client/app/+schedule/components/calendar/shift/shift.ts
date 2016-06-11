import { Input } from '@angular/core';
import { BaseComponent, Model } from '../../../../shared/index';

@BaseComponent({
  selector: 'shift',
  templateUrl: 'app/+schedule/components/calendar/shift/shift.html',
  styleUrls: ['app/+schedule/components/calendar/shift/shift.css']
})

export class ShiftComponent {
  @Input() shift: Model.Shift;
}
