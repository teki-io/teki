import { BaseComponent,
         ShiftTemplate,
         ShiftTemplateService }  from '../shared/index';
import { Widget }           from '../components/widget/index';
import { WidgetBody }       from '../components/widget-body/index';
import { WidgetHeader }     from '../components/widget-header/index';
import { Row }              from './components/row/index';
import { Headers }          from './components/headers/index';
import { NewRow }           from './components/new-row/index';
import { PrivatePage } from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';

@BaseComponent({
  selector: 'teki-shift-settings',
  templateUrl: 'app/+shift-settings/shift-settings.html',
  styleUrls: ['app/+shift-settings/shift-settings.css'],
  directives: [Widget, WidgetBody, WidgetHeader, Row, Headers, NewRow, AppLayoutComponent]
})

@PrivatePage()
export class ShiftSettingsComponent {
  templates: Array<ShiftTemplate>;
  adding: boolean = false;

  constructor(public shiftTemplateService: ShiftTemplateService) {
    this.shiftTemplateService.getAll()
      .subscribe((templates: Array<ShiftTemplate>) => {
        this.templates = _.sortBy(templates, 'sort');
      });
    this.shiftTemplateService.created.subscribe((template: ShiftTemplate) => this.onShiftTemplateCreated(template));
    this.shiftTemplateService.destroyed.subscribe((d: ShiftTemplate) => this.onDestroyed(d));
    this.shiftTemplateService.init();
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

  private onDestroyed(d: ShiftTemplate) {
    _.remove(this.templates, {id: d.id});
  }

  private onShiftTemplateCreated(template: ShiftTemplate) {
    this.templates = [template, ...this.templates];
    this.adding = false;
  }
}
