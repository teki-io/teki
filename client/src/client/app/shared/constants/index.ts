import { Headers } from 'angular2/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

const BASE_API = 'http://127.0.0.1:3000';
//export const SHIFT_ENDPOINT = '/api/shifts';
const EMPLOYEE_ENDPOINT = '/api/admin/employees';
const SHIFT_TEMPLATE_ENDPOINT = '/api/admin/shift_templates';
//const BASE_API = '';
const SHIFT_ENDPOINT = '/assets/fixtures/shifts.json';
//const EMPLOYEE_ENDPOINT = '/assets/fixtures/employees.json';
//const SHIFT_TEMPLATE_ENDPOINT = '/assets/fixtures/shift_templates.json';
export const API_ENDPOINTS = {
  BASE: BASE_API,
  SHIFTS: `${BASE_API}${SHIFT_ENDPOINT}`,
  EMPLOYEES: `${BASE_API}${EMPLOYEE_ENDPOINT}`,
  SHIFT_TEMPLATES: `${BASE_API}${SHIFT_TEMPLATE_ENDPOINT}`,
  USER_SIGNIN: `${BASE_API}/users/sign_in.json`,
  CREAT_USER: `${BASE_API}/users.json`
};
