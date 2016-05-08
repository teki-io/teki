import { BaseComponent,
         SecurityRouterOutlet } from '../../shared/index';
import { CORE_DIRECTIVES }     from 'angular2/common';
import { ROUTER_DIRECTIVES,
         RouteConfig }         from 'angular2/router';
import { SchedulerComponent,
         TeamComponent,
         SettingComponent,
         ShiftSettingsComponent,
         LoginComponent }  from '../../index';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.html',
  styleUrls: ['app/components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, SecurityRouterOutlet]
})

@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: SchedulerComponent
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
    useAsDefault: true
  },
  {
    path: '/scheduler',
    name: 'Scheduler',
    component: SchedulerComponent
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamComponent
  },
  {
    path: '/setting',
    name: 'Setting',
    component: SettingComponent
  },
  {
    path: '/shift-settings',
    name: 'ShiftSettings',
    component: ShiftSettingsComponent
  }
])

export class AppComponent {}
