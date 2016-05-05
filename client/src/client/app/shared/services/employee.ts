import { EventEmitter, Injectable, Inject } from 'angular2/core';
import { Employee } from '../models/index';
import { ApiEmployee } from '../api/index';
import { Operator, HttpErrorHandler } from './index';

@Injectable()
export class EmployeeService {
  public all: EventEmitter<Employee[]> = new EventEmitter<Employee[]>();
  public created: EventEmitter<Employee> = new EventEmitter<Employee>();
  public updated: EventEmitter<Employee> = new EventEmitter<Employee>();
  public destroyed: EventEmitter<Employee> = new EventEmitter<Employee>();
  private employees:  Employee[] = [];
  private initialized:  boolean = false;

  constructor(@Inject(ApiEmployee) public api: ApiEmployee,
              @Inject(HttpErrorHandler) public errorHandler: HttpErrorHandler) {}

  public init() {
    if (this.initialized) {
      this.all.emit(this.employees);
    } else {
      this.api.getAll()
        .subscribe((emplooyees: Array<Employee>) => {
          this.employees = emplooyees;
          this.initialized = true;
          this.all.emit(this.employees);
        }, e => this.errorHandler.handle(e));
    }
  }

  public update(employee: Employee): EventEmitter<Employee> {
    this.api.update(employee)
      .subscribe((employee: Employee) => {
        this.updateEmployee(employee);
        this.updated.emit(employee);
      }, e => this.errorHandler.handle(e));
    return this.updated;
  }

  public create(employee: Employee): EventEmitter<Employee> {
    this.api.create(employee)
      .subscribe((employee: Employee) => {
        this.updateEmployee(employee);
        this.created.emit(employee);
      }, e => this.errorHandler.handle(e));
    return this.created;
  }

  public destroy(employee: Employee): EventEmitter<Employee> {
    this.api.destroy(employee)
      .subscribe((employee: Employee) => {
        this.removeEmployee(employee);
        this.destroyed.emit(employee);
      }, e => this.errorHandler.handle(e));
    return this.destroyed;
  }

  public getAll(): EventEmitter<Employee[]> {
    return this.all;
  }

  public nameTaken(employee: Employee): boolean {
    let shiftTemplate = _.find(this.employees, (d) => {
      return d.firstName === employee.firstName && d.lastName === employee.lastName && d.id !== employee.id;
    });
    return !_.isEmpty(shiftTemplate);
  }

  private removeEmployee(d: Employee) {
    _.remove(this.employees, { id: d.id });
  }

  private updateEmployee(shift: Employee) {
    Operator.update(this.employees, shift);
  }
}
