import {BaseComponent,
        MultilingualService} from '../../shared/index';
import {CORE_DIRECTIVES}     from 'angular2/common';
import {ROUTER_DIRECTIVES,
        RouteConfig}         from 'angular2/router';
import {SidebarComponent,
        ToolbarComponent}   from '../index';
import {SchedulerComponent} from '../../+scheduler/index';
import {SettingComponent}   from '../../+setting/index';
import {ChangeDetectionStrategy} from 'angular2/core';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.component.html',
  styleUrls: ['app/components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, SidebarComponent, ToolbarComponent, CORE_DIRECTIVES],
  providers: [MultilingualService],
  changeDetection: ChangeDetectionStrategy.Default
})

@RouteConfig([
  {
    path: '/scheduler',
    name: 'Scheduler',
    component: SchedulerComponent,
    useAsDefault: true
  },
  {
    path: '/setting',
    name: 'Setting',
    component: SettingComponent
  }
])

export class AppComponent {
  open:boolean = false;

  constructor(private multilang: MultilingualService) {
  }

  onToggled() {
    this.open = !this.open;
  }
}
