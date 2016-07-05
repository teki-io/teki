import {
  SchedulerComponent,
  TeamComponent,
  SettingComponent,
  ShiftSettingsComponent,
  LoginComponent,
  SignupComponent,
  ScheduleComponent,
  EmployeeComponent
}  from '../../index';

export const TekiRoutes = [
  {
    path: '/',
    name: 'Home',
    component: ScheduleComponent
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
    path: '/employees',
    name: 'Employees',
    component: EmployeeComponent
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
];
