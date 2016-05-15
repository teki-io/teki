import {
  ShiftService,
  HttpErrorHandler,
  EmployeeService,
  ShiftTemplateService,
  LoginService,
  AuthenticationService
} from './services/index';

import {
  ApiShift,
  ApiEmployee,
  ApiShiftTemplate
} from './api/index';

import {
  employeeReducer,
  shiftTemplateReducer,
  shiftReducer
} from './reducers/index';

import { MULTILINGUAL_PROVIDERS } from './i18n/index';

export * from './services/index';
export * from './directives/index';

export * from './core/index';
export * from './i18n/index';

export * from './models/index';
export * from './constants/index';
export * from './api/index';

export * from './interfaces/index';
export * from './actions/index';
export * from './reducers/index';

export const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  LoginService,
  ApiShift,
  ApiEmployee,
  ApiShiftTemplate,
  AuthenticationService,
  HttpErrorHandler,
  ShiftService,
  EmployeeService,
  ShiftTemplateService
];

export const APP_STORE:any = {
  employees: employeeReducer,
  shiftTemplates: shiftTemplateReducer,
  shifts: shiftReducer
};
