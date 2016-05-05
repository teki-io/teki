import { ShiftService,
         HttpErrorHandler,
         EmployeeService } from './services/index';
import { LoginService } from './services/login';
import { ApiShift,
         ApiEmployee } from './api/index';
import { MULTILINGUAL_PROVIDERS } from './i18n/index';

export * from './services/index';

export * from './core/index';
export * from './i18n/index';

export * from './models/index';
export * from './constants/index';
export * from './api/index';

export const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  LoginService,
  ApiShift,
  ApiEmployee,
  HttpErrorHandler,
  ShiftService,
  EmployeeService
];
