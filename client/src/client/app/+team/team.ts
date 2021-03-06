import { ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, PrivatePage }  from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';
import { Widget }           from '../components/widget/index';
import { WidgetBody }       from '../components/widget-body/index';
import { WidgetHeader }     from '../components/widget-header/index';
import { Row }              from './components/row/index';
import { Headers }          from './components/headers/index';
import * as Service         from '../shared/services/index';

@BaseComponent({
  selector: 'teki-team',
  templateUrl: 'app/+team/team.html',
  styleUrls: ['app/+team/team.css'],
  directives: [Widget, WidgetBody, WidgetHeader, Row, Headers, AppLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@PrivatePage()
export class TeamComponent {
  adding: boolean = false;

  constructor(private employeeService: Service.Employee) {}

  ngOnInit() {
    this.employeeService.load();
  }
}
