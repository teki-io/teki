import { BaseComponent } from '../shared/core/index';
import { LangSwitcherComponent } from '../shared/i18n/index';
import { PrivatePage } from '../shared/index';
import { Widget }           from '../components/widget/index';
import { WidgetBody }       from '../components/widget-body/index';
import { AppLayoutComponent } from '../components/app-layout/index';

@BaseComponent({
  selector: 'teki-setting',
  templateUrl: 'app/+setting/setting.html',
  styleUrls: ['app/+setting/setting.css'],
  directives: [LangSwitcherComponent, AppLayoutComponent, Widget, WidgetBody]
})

@PrivatePage()
export class SettingComponent {}
