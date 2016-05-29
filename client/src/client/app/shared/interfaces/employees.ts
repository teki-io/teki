import { Model } from '../index';

export interface IEmployees {
  employees: Model.Admin.Employee[];
  creating: boolean;
  loading: boolean;
}
