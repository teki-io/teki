import { Input } from '@angular/core';
import { BaseComponent } from '../../shared/index';
import { Loading } from '../loading/index';

@BaseComponent({
  selector: 'teki-widget-body',
  properties: ['loading', 'classes'],
  templateUrl: 'app/components/widget-body/widget-body.html',
  directives: [Loading]
})

export class WidgetBody {
  @Input()
  loading:boolean;

  @Input()
  classes:string;

  constructor() {
    this.loading = false;
    this.classes = '';
  }
}
