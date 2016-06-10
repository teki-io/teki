const BASE_API = 'http://localhost:3000';

export const API_ENDPOINTS = {
  BASE: BASE_API,
  ADMIN: {
    SHIFTS: `${BASE_API}/api/admin/shifts`,
    EMPLOYEES: `${BASE_API}/api/admin/employees`,
    SHIFT_TEMPLATES: `${BASE_API}/api/admin/shift_templates`,
  },
  SHIFTS: `${BASE_API}/api/shifts`,
  USER_SIGNIN: `${BASE_API}/users/sign_in.json`,
  CREAT_USER: `${BASE_API}/users.json`
};
