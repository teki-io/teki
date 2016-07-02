import {
  BaseComponent,
  SecurityRouterOutlet,
  MultilingualService
} from '../../shared/index';
import { CORE_DIRECTIVES } from '@angular/common';
import {
  ROUTER_DIRECTIVES,
  RouteConfig
} from '@angular/router-deprecated';
import {
  SchedulerComponent,
  TeamComponent,
  SettingComponent,
  ShiftSettingsComponent,
  LoginComponent,
  SignupComponent,
  ScheduleComponent
}  from '../../index';
import { ViewContainerRef } from '@angular/core';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap/index';
import { Loading } from '../loading/index';
import * as Service from '../../shared/services/index';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.html',
  styleUrls: ['app/components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, SecurityRouterOutlet, Loading],
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
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: ScheduleComponent
  }
])

export class AppComponent {
  constructor(
    private modal: Modal,
    private multilang: MultilingualService,
    private viewContainer: ViewContainerRef,
    private profileService: Service.Profile
  ) {
    modal.defaultViewContainer = viewContainer;
  }

  ngOnInit() {
    this.profileService.load();
  }
}
