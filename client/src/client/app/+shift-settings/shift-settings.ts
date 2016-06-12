import { ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, PrivatePage, Model } from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';
import { Widget }             from '../components/widget/index';
import { WidgetBody }         from '../components/widget-body/index';
import { WidgetHeader }       from '../components/widget-header/index';
import { Row }                from './components/row/index';
import { Headers }            from './components/headers/index';
import { NewRow }             from './components/new-row/index';
import * as Service           from '../shared/services/index';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';
import { DragulaServiceHelper } from './services/dragula-service-helper';
import { Observable }         from 'rxjs/Observable';

@BaseComponent({
  selector: 'teki-shift-settings',
  templateUrl: 'app/+shift-settings/shift-settings.html',
  styleUrls: ['app/+shift-settings/shift-settings.css'],
  directives: [Widget, WidgetBody, WidgetHeader, Row, Headers, NewRow, AppLayoutComponent, Dragula],
  viewProviders: [DragulaService],
  providers: [DragulaServiceHelper],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@PrivatePage()
export class ShiftSettingsComponent {
  adding: boolean = false;
  shiftTemplates: Observable<Model.Admin.ShiftTemplate[]>;

  constructor(
    private companyService: Service.Admin.Company,
    private shiftTemplateService: Service.Admin.ShiftTemplate,
    private dragulaService: DragulaService,
    private dragulaHelper: DragulaServiceHelper) {
    this.shiftTemplates = shiftTemplateService.shiftTemplates;
    dragulaService.drag.subscribe((value: any) => dragulaHelper.onDrag(value.slice(1)));
    dragulaService.drop.subscribe((value: any) => dragulaHelper.onDrop(value.slice(1)));
    dragulaService.dropModel.subscribe(() => this.onDropModel());
  }

  ngOnInit() {
    this.shiftTemplateService.load();
  }

  add() {
    this.adding = true;
  }

  cancel() {
    this.adding = false;
  }

  editCancel() {
    this.cancel();
  }

  private onDropModel() {
    this.shiftTemplates.subscribe((templates) => this.companyService.update_templates(templates));
  }
}
