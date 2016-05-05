import { BaseComponent } from '../shared/core/index';
import { LangSwitcherComponent } from '../shared/i18n/index';

@BaseComponent({
  selector: 'teki-setting',
  templateUrl: 'app/+setting/setting.html',
  styleUrls: ['app/+setting/setting.css'],
  directives: [LangSwitcherComponent]
})
export class SettingComponent {}
