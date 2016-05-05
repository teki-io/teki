import { Output,
         EventEmitter }      from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { BaseComponent }     from '../../shared/index';

@BaseComponent({
  selector: 'teki-sidebar',
  templateUrl: 'app/components/sidebar/sidebar.html',
  styleUrls: ['app/components/sidebar/sidebar.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent {
  @Output() toggled:EventEmitter<any> = new EventEmitter();

  toggle() {
    this.toggled.emit({});
  }
}
