import { BaseComponent,
         MultilingualService } from '../../shared/index';
import { CORE_DIRECTIVES }     from 'angular2/common';
import { ROUTER_DIRECTIVES,
         RouteConfig }         from 'angular2/router';
import { SidebarComponent }    from '../sidebar/index';
import { ToolbarComponent }    from '../toolbar/index';
import { SchedulerComponent }  from '../../+scheduler/index';
import { SettingComponent }    from '../../+setting/index';
import { ColleagueComponent }  from '../../+colleague/index';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.html',
  styleUrls: ['app/components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, SidebarComponent, ToolbarComponent, CORE_DIRECTIVES],
  providers: [MultilingualService]
})

@RouteConfig([
  {
    path: '/scheduler',
    name: 'Scheduler',
    component: SchedulerComponent,
    useAsDefault: true
  },
  {
    path: '/colleague',
    name: 'Colleague',
    component: ColleagueComponent
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