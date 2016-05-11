import { EventEmitter, Injectable, Inject } from '@angular/core';
import { ShiftTemplate } from '../models/index';
import { ApiShiftTemplate } from '../api/index';
import { Operator, HttpErrorHandler } from './index';

@Injectable()
export class ShiftTemplateService {
  public all: EventEmitter<ShiftTemplate[]> = new EventEmitter<ShiftTemplate[]>();
  public created: EventEmitter<ShiftTemplate> = new EventEmitter<ShiftTemplate>();
  public updated: EventEmitter<ShiftTemplate> = new EventEmitter<ShiftTemplate>();
  public destroyed: EventEmitter<ShiftTemplate> = new EventEmitter<ShiftTemplate>();
  public shiftTemplates: ShiftTemplate[] = [];
  private initialized:  boolean = false;

  constructor(@Inject(ApiShiftTemplate) public api: ApiShiftTemplate,
              @Inject(HttpErrorHandler) public errorHandler: HttpErrorHandler) {}

  public init() {
    if (this.initialized) {
      this.all.emit(this.shiftTemplates);
    } else {
      this.api.getAll()
        .subscribe((emplooyees: Array<ShiftTemplate>) => {
          this.shiftTemplates = emplooyees;
          this.initialized = true;
          this.all.emit(this.shiftTemplates);
        }, e => this.errorHandler.handle(e));
    }
  }

  public update(shiftTemplate: ShiftTemplate): EventEmitter<ShiftTemplate> {
    this.api.update(shiftTemplate)
      .subscribe((shiftTemplate: ShiftTemplate) => {
        this.updateShiftTemplate(shiftTemplate);
        this.updated.emit(shiftTemplate);
      }, e => this.errorHandler.handle(e));
    return this.updated;
  }

  public create(shiftTemplate: ShiftTemplate): EventEmitter<ShiftTemplate> {
    this.api.create(shiftTemplate)
      .subscribe((shiftTemplate: ShiftTemplate) => {
        this.updateShiftTemplate(shiftTemplate);
        this.created.emit(shiftTemplate);
      }, e => this.errorHandler.handle(e));
    return this.created;
  }

  public getAll(): EventEmitter<ShiftTemplate[]> {
    return this.all;
  }

  public nameTaken(newTemplate: ShiftTemplate): boolean {
    let shiftTemplate = _.find(this.shiftTemplates, (template) => {
      return template.name === newTemplate.name && template.id !== newTemplate.id;
    });
    return _.isEmpty(shiftTemplate) ? false: true;
  }

  public destroy(d: ShiftTemplate): EventEmitter<ShiftTemplate> {
    this.api.destroy(d)
      .subscribe((d: ShiftTemplate) => {
        this.remove(d);
        this.destroyed.emit(d);
      }, e => this.errorHandler.handle(e));
    return this.destroyed;
  }

  private remove(d: ShiftTemplate) {
    _.remove(this.shiftTemplates, { id: d.id });
  }

  private updateShiftTemplate(shift: ShiftTemplate) {
    Operator.update(this.shiftTemplates, shift);
  }
}
