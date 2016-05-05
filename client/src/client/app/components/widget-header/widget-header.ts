import { Input}          from 'angular2/core';
import { BaseComponent } from '../../shared/index';

@BaseComponent({
  selector: 'teki-widget-header',
  templateUrl: 'app/components/widget-header/widget-header.html'
})

export class WidgetHeader {
  @Input()
  title:string;

  @Input()
  icon:string;

  constructor() {
    this.title = '';
    this.icon = '';
  }
}
