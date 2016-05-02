import {Output,
        EventEmitter}      from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {BaseComponent}     from '../shared/core/index';

@BaseComponent({
  selector: 'teki-sidebar',
  templateUrl: 'app/components/sidebar.component.html',
  styleUrls: ['app/components/sidebar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent {
  @Output() toggled:EventEmitter<any> = new EventEmitter();

  toggle() {
    this.toggled.emit({});
  }
}
