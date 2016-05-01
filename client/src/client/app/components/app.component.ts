import {Component}          from 'angular2/core';
import {CORE_DIRECTIVES}    from 'angular2/common';
import {ROUTER_DIRECTIVES,
        RouteConfig}        from 'angular2/router';
import {SidebarComponent}    from './sidebar.component';
import {ToolbarComponent}   from './toolbar.component';
import {SchedulerComponent} from '../+scheduler/index';

@Component({
  selector: 'teki-app',
  templateUrl: 'app/components/app.component.html',
  styleUrls: ['app/components/app.component.css'],
  directives: [ROUTER_DIRECTIVES, SidebarComponent, ToolbarComponent, CORE_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/scheduler',
    name: 'Scheduler',
    component: SchedulerComponent
  }
])
export class AppComponent {
  open:boolean = false;

  onToggled() {
    this.open = !this.open;
  }
}
