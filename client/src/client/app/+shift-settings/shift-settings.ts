import { ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, PrivatePage } from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';
import { Widget }             from '../components/widget/index';
import { WidgetBody }         from '../components/widget-body/index';
import { WidgetHeader }       from '../components/widget-header/index';
import { Row }                from './components/row/index';
import { Headers }            from './components/headers/index';
import { NewRow }             from './components/new-row/index';
import * as Service           from '../shared/services/index';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';
import { TimerWrapper } from 'angular2/src/facade/async';


@BaseComponent({
  selector: 'teki-shift-settings',
  templateUrl: 'app/+shift-settings/shift-settings.html',
  styleUrls: ['app/+shift-settings/shift-settings.css'],
  directives: [Widget, WidgetBody, WidgetHeader, Row, Headers, NewRow, AppLayoutComponent, Dragula],
  viewProviders: [DragulaService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@PrivatePage()
export class ShiftSettingsComponent {
  adding: boolean = false;

  constructor(
    private shiftTemplateService: Service.Admin.ShiftTemplate,
    private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value: any) => this.onDrag(value.slice(1)));
    dragulaService.drop.subscribe((value: any) => this.onDrop(value.slice(1)));
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

  private hasClass(el: any, name: string): boolean {
    return el.className.indexOf(name) > 0;
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(name, '');
    }
  }

  private onDrag(args) {
    let [e] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e] = args;
    this.addClass(e, 'ex-moved');
    TimerWrapper.setTimeout(() => {
      this.removeClass(e, 'ex-moved');
    }, 200);
  }
}
