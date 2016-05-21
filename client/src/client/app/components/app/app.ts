import { BaseComponent,
         SecurityRouterOutlet,
         MultilingualService } from '../../shared/index';
import { CORE_DIRECTIVES }     from '@angular/common';
import { ROUTER_DIRECTIVES,
         RouteConfig }         from '@angular/router-deprecated';
import { SchedulerComponent,
         TeamComponent,
         SettingComponent,
         ShiftSettingsComponent,
         LoginComponent,
         SignupComponent }  from '../../index';
import { ViewContainerRef } from '@angular/core';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap/index';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.html',
  styleUrls: ['app/components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, SecurityRouterOutlet],
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
  providers: [MultilingualService]
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
    component: LoginComponent
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupComponent
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

export class AppComponent {
  constructor(private multilang: MultilingualService, public modal: Modal, viewContainer: ViewContainerRef) {
    modal.defaultViewContainer = viewContainer;
  }
}
