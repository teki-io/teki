import { ShiftService,
         HttpErrorHandler,
         EmployeeService,
         ShiftTemplateService,
         LoginService } from './services/index';
import { ApiShift,
         ApiEmployee,
         ApiShiftTemplate } from './api/index';
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
  ApiShiftTemplate,
  HttpErrorHandler,
  ShiftService,
  EmployeeService,
  ShiftTemplateService
];
