import { Employee } from '../models/index';

export interface IEmployees {
  employees: Employee[];
  creating: boolean;
  loading: boolean;
}
